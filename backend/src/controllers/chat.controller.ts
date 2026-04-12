import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';
import {generateTitle} from '../services/models.service.js'
import graph from '../services/graph.ai.service.js';

import {type Request,type Response } from "express";



export const chatController=async(req:Request,res:Response)=>{
 
    const {message,chatId}=req.body

   let title:string|null=null

let currentchatId=chatId
let history:any=null

   let inputForGraph: any;

   if(!chatId){
    const response=await generateTitle(message)
    title=response
    const chat=await chatModel.create({
 title,
 userID:(req as any).user?.id,
 
    })
    currentchatId = chat._id;
    inputForGraph = message;

   }else{
      const prevMessage=await messageModel.find({chatId:currentchatId}).sort({createdAt: 1}).lean();
      inputForGraph = [...prevMessage, { problem: message }];
   }

   const response=await graph(inputForGraph)


   const saveairesponse=await messageModel.create({
    chatId:currentchatId,
    problem:response.problem,
    solution_1:response.solution_1,
    solution_2:response.solution_2,
    AI_judgement:{
        solution_1_score:response.AI_judgement.solution_1_score,
        solution_2_score:response.AI_judgement.solution_2_score,
        solution_1_reason:response.AI_judgement.solution_1_reason,
        solution_2_reason:response.AI_judgement.solution_2_reason,
    },
   })

   res.status(200).json({
    message:"Message sent successfully",
    title:title,
    chatId:currentchatId,
   response:saveairesponse,
   })


}

export const getChats=async(req:Request,res:Response)=>{

const chats=await chatModel.find({userID:(req as any).user?.id}).sort({createdAt: -1})

res.status(200).json({
   message:"your chats fetched succesfully",
   chats,
})

}

export const getMessages=async(req:Request,res:Response)=>{

const messages=await messageModel.find({chatId:(req as any ).params?.id})

res.status(200).json({
   message:"your message fetched succesfully",
messages
})

}
