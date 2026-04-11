import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import chatRouter from "./routes/chat.route.js"
import ErrorMiddleware from "./middleware/Error.middleware.js";
const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/chat",chatRouter)


app.use(ErrorMiddleware)

export default app;