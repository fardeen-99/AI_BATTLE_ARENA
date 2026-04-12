import axios from "axios";
import { type RegisterForm,type LoginForm } from "../../types/auth.types.js";

const API=axios.create({
    baseURL:"/api",
    withCredentials:true,
})


export const Register=async(form:RegisterForm)=>{
    const res=await API.post("/auth/register",form)
    return res.data
}

export const Login=async(form:LoginForm)=>{
    const res=await API.post("/auth/login",form)
    return res.data
}

export const Logout=async()=>{
    const res=await API.post("/auth/logout")
    return res.data
}

export const GetMe=async()=>{
    const res=await API.get("/auth/me")
    return res.data
}