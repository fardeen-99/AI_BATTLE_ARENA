import { useEffect } from "react"
import useAuth from "../hooks/auth.hook"
const Authinit=({children}:any)=>{


    const {handlegetme}=useAuth()
    useEffect(()=>{
        handlegetme()
    },[])

    return(
        children
    )
}

export default Authinit