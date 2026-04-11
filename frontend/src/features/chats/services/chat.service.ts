import axios from "axios"

const API=axios.create({
    baseURL:"/api",
    withCredentials:true,
})

export const SendMessage=async(message:string,chatId:string)=>{
    try {
        const res=await API.post("/chat",{message,chatId})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetChats=async()=>{
    try {
        const res=await API.get("/chat")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetMessages=async(chatId:string)=>{
    try {
        const res=await API.get(`/chat/message/${chatId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
