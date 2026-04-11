import axios from "axios";
import { type RegisterForm,type LoginForm } from "../../types/auth.types.js";

const API=axios.create({
    baseURL:"/api",
    withCredentials:true,
})


export const Register=async(form:RegisterForm)=>{
    try {
        const res=await API.post("/auth/register",form)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const Login=async(form:LoginForm)=>{
    try {
        const res=await API.post("/auth/login",form)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const Logout=async()=>{
    try {
        const res=await API.post("/auth/logout")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const GetMe=async()=>{
    try {
        const res=await API.get("/auth/me")
        return res.data
    } catch (error) {
        console.log(error)
    }
}