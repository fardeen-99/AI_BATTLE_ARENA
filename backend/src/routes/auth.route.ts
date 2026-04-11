import { Router } from "express";
import { registerUser,loginUser,logoutUser,getme } from "../controllers/auth.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js"
import {RegisterValidation,LoginValidation} from "../validation/auth.validation.js"
const authRouter=Router()


authRouter.post("/register",RegisterValidation,registerUser)
authRouter.post("/login",LoginValidation,loginUser)
authRouter.post("/logout",authMiddleware,logoutUser)
authRouter.get("/me",authMiddleware,getme)

export default authRouter