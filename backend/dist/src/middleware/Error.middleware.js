import {} from "express";
const ErrorMiddleware = async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack,
    });
};
export default ErrorMiddleware;
//# sourceMappingURL=Error.middleware.js.map