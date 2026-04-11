import { useSelector } from "react-redux"
import type {RootState} from "../../../store/store"
import Chat from "../components/Chat"
import { useState } from "react"
import useChat from "../hooks/chat.hook"

const Home=()=>{

const [message,setMessage]=useState<string>("")

const {currentChat}=useSelector((state:RootState)=>state.chats)
const {handleSendMessage}=useChat()

if(currentChat){
    return <Chat/>
}


return (
    <>
    <div className="flex flex-col  items-center justify-center min-h-screen w-full bg-gray-700">
        <h1 className="text-2xl 
        font-bold">Home</h1>
        <div className="flex items-center justify-center w-[80%] m-auto">

        <input type="text" 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className="w-full py-2 px-3 rounded-2xl bg-transparent border border-gray-400 text-white" placeholder="Ask a question" />
        <button 
        onClick={()=>{
            handleSendMessage(message,currentChat)
            setMessage("")
        }}
        className=" py-2 px-3 rounded-2xl bg-transparent border border-gray-400 text-white">Ask</button>
        </div>
    </div>
    </>
)
}

export default Home