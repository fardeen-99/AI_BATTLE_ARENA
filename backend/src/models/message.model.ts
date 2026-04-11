import mongoose, { Document } from 'mongoose'

interface messageType extends Document{
    chatId:mongoose.Schema.Types.ObjectId,
   problem:string,
   solution_1:string,
   solution_2:string,
   AI_judgement:{
    solution_1_score:number,
    solution_2_score:number,
    solution_1_reason:string,
    solution_2_reason:string,
   }
}

const messageSchema=new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true,
    },
    problem:{
      type:String,
      required:true,
    },
    solution_1:{
        type:String,
        required:true,
    },
    solution_2:{
        type:String,
        required:true,
    },
    AI_judgement:{
      solution_1_score:{
        type:Number,
        required:true,
      },
      solution_2_score:{
        type:Number,
        required:true,
      },
      solution_1_reason:{
        type:String,
        required:true,
      },
      solution_2_reason:{
        type:String,
        required:true,
      },
    }
    
}, { timestamps: true });

const messageModel=mongoose.model<messageType>("message",messageSchema)

export default messageModel