import { Router } from "express";
import { registerUser,loginUser,logoutUser,getme } from "../controllers/auth.controller.js";

const authRouter=Router()


authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.post("/logout",logoutUser)
authRouter.get("/me",getme)

export default authRouter