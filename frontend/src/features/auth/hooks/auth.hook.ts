import {setloading,seterror,setuser} from "../state/auth.slice.js"
import {Register,Login,Logout,GetMe} from "../services/authh.service.js"
import {useDispatch} from "react-redux"
import { type LoginForm, type RegisterForm } from "../../types/auth.types.js"
import type {AppDispatch} from "../../../store/store.js"

const useAuth=()=>{
const dispatch=useDispatch<AppDispatch>()


const handleregister=async(form: RegisterForm)=>{
    try {
        dispatch(setloading(true))
        const res=await Register(form)
        dispatch(setuser(res.user))
    } catch (error) {
        dispatch(seterror(error))
    }finally{
        dispatch(setloading(false))
    }
}
const handlelogin=async(form:LoginForm)=>{
    try {
        dispatch(setloading(true))
        const res=await Login(form)
        dispatch(setuser(res.user))
    } catch (error) {
        dispatch(seterror(error))
    }finally{
        dispatch(setloading(false))
    }
}
const handlelogout=async()=>{
    try {
        dispatch(setloading(true))
        await Logout()
        dispatch(setuser(null))
    } catch (error) {
        dispatch(seterror(error))
    }finally{
        dispatch(setloading(false))
    }
}
const handlegetme=async()=>{
    try {
        dispatch(setloading(true))
        const res=await GetMe()
        dispatch(setuser(res.user))
    } catch (error) {
        dispatch(seterror(error))
    }finally{
        dispatch(setloading(false))
    }
}

    return{handleregister,handlelogin,handlelogout,handlegetme}
}

export default useAuth