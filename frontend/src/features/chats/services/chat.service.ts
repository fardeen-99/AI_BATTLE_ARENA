import axios from "axios"

const API=axios.create({
    baseURL:"/api",
    withCredentials:true,
})

export const SendMessage=async(message:string,chatId:string)=>{
    const res=await API.post("/chat",{message,chatId})
    return res.data
}

export const GetChats=async()=>{
    const res=await API.get("/chat")
    return res.data
}

export const GetMessages=async(chatId:string)=>{
    const res=await API.get(`/chat/message/${chatId}`)
    return res.data
}

