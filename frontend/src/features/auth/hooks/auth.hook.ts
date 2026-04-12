import {setloading,seterror,setuser} from "../state/auth.slice.js"
import {Register,Login,Logout,GetMe} from "../services/authh.service.js"
import {useDispatch} from "react-redux"
import { type LoginForm, type RegisterForm } from "../../types/auth.types.js"
import type {AppDispatch} from "../../../store/store.js"

const useAuth=()=>{
const dispatch=useDispatch<AppDispatch>()


const handleregister=async(form: RegisterForm)=>{
    try {
        dispatch(seterror(null))
        dispatch(setloading(true))
        const res=await Register(form)
        dispatch(setuser(res.user))
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Registration failed"
        dispatch(seterror(message))
    }finally{
        dispatch(setloading(false))
    }
}
const handlelogin=async(form:LoginForm)=>{
    try {
        dispatch(seterror(null))
        dispatch(setloading(true))
        const res=await Login(form)
        dispatch(setuser(res.user))
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Login failed"
        dispatch(seterror(message))
    }finally{
        dispatch(setloading(false))
    }
}
const handlelogout=async()=>{
    try {
        dispatch(seterror(null))
        dispatch(setloading(true))
        await Logout()
        dispatch(setuser(null))
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Logout failed"
        dispatch(seterror(message))
    }finally{
        dispatch(setloading(false))
    }
}
const handlegetme=async()=>{
    try {
        dispatch(seterror(null))
        dispatch(setloading(true))
        const res=await GetMe()
        dispatch(setuser(res.user))
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Failed to fetch user"
        dispatch(seterror(message))
    }finally{
        dispatch(setloading(false))
    }
}

    return{handleregister,handlelogin,handlelogout,handlegetme}
}


export default useAuth