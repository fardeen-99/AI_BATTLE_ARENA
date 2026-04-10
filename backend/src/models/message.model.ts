import mongoose, { Document } from 'mongoose'

interface messageType extends Document{
    chatId:mongoose.Schema.Types.ObjectId,
    role:"ai"|"user",
    content:string,
}

const messageSchema=new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true,
    },
    role:{
        type:String,
        enum:["ai","user"],
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    
}, { timestamps: true });

const messageModel=mongoose.model<messageType>("message",messageSchema)

export default messageModel