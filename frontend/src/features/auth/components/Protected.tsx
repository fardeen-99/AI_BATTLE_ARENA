import { useSelector } from "react-redux"
import type {RootState} from "../../../store/store"
import { Navigate } from "react-router-dom"
const Protected=({children}:any)=>{
    const {user,loading}=useSelector((state:RootState)=>state.auth)
    if(loading){
        return <div>Loading...</div>
    }
    if(!user){
        return <Navigate to="/login"/>
    }
    return children
}

export default Protected