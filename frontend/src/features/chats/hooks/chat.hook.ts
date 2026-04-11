import { useDispatch } from "react-redux"
import type {AppDispatch} from "../../../store/store"
import {SendMessage,GetChats,GetMessages} from "../services/chat.service"
import {setChats,setMessages,setLoading,setError,setCurrentChat, addchat, addmessage} from "../state/chat.slice"

const useChat=()=>{
const dispatch:AppDispatch=useDispatch()


const handleSendMessage=async(message:string,chatId:string)=>{
    try {
        // dispatch(addmessage({
        //     question:message,
        //     solution_1:"",
        //     solution_2:"",
        //     solution_1_score:0,
        //     solution_2_score:0,
        //     solution_1_reason:"",
        //     solution_2_reason:"",
        // }))
        dispatch(setLoading(true))
        if (!chatId) {
            dispatch(setMessages([]))
        }
        const res=await SendMessage(message,chatId)
        dispatch(addmessage({
            problem: res.response.problem,
            solution_1: res.response.solution_1,
            solution_2: res.response.solution_2,
            AI_judgement: {
                solution_1_score: res.response.AI_judgement.solution_1_score,
                solution_2_score: res.response.AI_judgement.solution_2_score,
                solution_1_reason: res.response.AI_judgement.solution_1_reason,
                solution_2_reason: res.response.AI_judgement.solution_2_reason,
            }
        })
    )
    if (res.title) {
        dispatch(addchat({ _id: res.chatId, title: res.title }))
    }
    dispatch(setCurrentChat(res.chatId))
    }
    catch(error){
        dispatch(setError(error))
    }finally{
        dispatch(setLoading(false))
    }

}

const handleGetChats=async()=>{
    try {
        dispatch(setLoading(true))
        const res=await GetChats()
        dispatch(setChats(res.chats))
    }
    catch(error){
        dispatch(setError(error))
    }finally{
        dispatch(setLoading(false))
    }
}

const handleGetMessages=async(chatId:string)=>{
    try {
        dispatch(setLoading(true))

        const res=await GetMessages(chatId)
        dispatch(setMessages(res.messages))
    }
    catch(error){
        dispatch(setError(error))
    }finally{
        dispatch(setLoading(false))
    }
}

return{
handleSendMessage,
handleGetChats,
handleGetMessages
}

}

export default useChat