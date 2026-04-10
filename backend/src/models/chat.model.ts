import mongoose,{Document} from 'mongoose'

interface chatType extends Document{
 userID:mongoose.Schema.Types.ObjectId,
 title:string,
   
}


const chatSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    title:{
        type:String,
        required:true,
    }
    
}, { timestamps: true });

const chatModel=mongoose.model<chatType>("chat",chatSchema)

export default chatModel