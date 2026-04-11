import { Outlet } from "react-router-dom"
import Sidebar from "./features/chats/components/Sidebar"


const Applayout=()=>{
    return(
        <>
        <div className="flex max-h-full">
        <Sidebar/>
        <Outlet/>
        </div>
        </>
    )
}

export default Applayout