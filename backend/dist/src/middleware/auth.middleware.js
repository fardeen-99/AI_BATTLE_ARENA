import jwt from "jsonwebtoken";
import {} from "express";
import { configuration } from "../config/config.js";
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const secret = configuration.jwt_secret;
        if (!secret) {
            return res.status(500).json({ message: "Internal server error" });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
            req.user = decoded;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=auth.middleware.js.map