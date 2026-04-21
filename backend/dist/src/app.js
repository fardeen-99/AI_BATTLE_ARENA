import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import ErrorMiddleware from "./middleware/Error.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
app.use(express.json());
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use(express.static(path.join(__dirname, "../public")));
app.get("*Name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use(ErrorMiddleware);
export default app;
//# sourceMappingURL=app.js.map