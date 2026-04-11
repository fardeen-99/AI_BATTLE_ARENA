import { Router } from "express";

import {chatController,getChats,getMessages} from '../controllers/chat.controller.js'
import {authMiddleware} from "../middleware/auth.middleware.js"
const chatRouter=Router()


chatRouter.post("/",authMiddleware,chatController)
chatRouter.get("/",authMiddleware,getChats)
chatRouter.get("/message/:id",authMiddleware,getMessages)



export default chatRouter