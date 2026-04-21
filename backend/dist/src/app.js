import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import ErrorMiddleware from "./middleware/Error.middleware.js";

const app = express();

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Static folder serve karo (frontend build)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

// Error middleware
app.use(ErrorMiddleware);

// ✅ SPA fallback (React / frontend routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;