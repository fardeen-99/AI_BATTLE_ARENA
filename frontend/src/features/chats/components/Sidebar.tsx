import { useEffect } from "react"
import useChat from "../hooks/chat.hook"
import { useSelector } from "react-redux"
import type {RootState} from "../../../store/store"
import { useDispatch } from "react-redux"
import { setCurrentChat } from "../state/chat.slice"


const Sidebar=()=>{

const {chats}=useSelector((state:RootState)=>state.chats)
const dispatch=useDispatch()
    const {handleGetChats,handleGetMessages}=useChat()

    useEffect(()=>{
        handleGetChats()
    },[])

    return(
        <>
        <div className="min-h-screen overflow-y-auto w-1/4 bg-gray-800">
            <h1 
            onClick={()=>dispatch(setCurrentChat(null))}
            className="text-2xl font-bold">new chat</h1>
            {
                chats?.map((chat)=>(
                    <div key={chat._id} className="p-2">
                        <h1 
                        onClick={()=>{
                            dispatch(setCurrentChat(chat._id))
                            handleGetMessages(chat._id)
                        }}
                        
                        className="text-xl font-bold">{chat.title}</h1>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default Sidebar