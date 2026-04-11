import { useState } from "react"
import { type RegisterForm } from "../../types/auth.types.js"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/auth.hook"
import { useSelector } from "react-redux"
import type {RootState} from "../../../store/store.js"
import { useEffect } from "react"
const Register=()=>{
    const {user}=useSelector((state:RootState)=>state.auth)
    const navigate=useNavigate()
useEffect(()=>{
    if(user){
        navigate("/")
    }
},[])

    const {handleregister}=useAuth()

    const [form,setform]=useState<RegisterForm>({
        username:"",
        email:"",
        password:""
    })

    const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setform(prev=>({...prev,[name]:value}))
    }

    const submiter=async(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        await handleregister(form)
        setform({
            username:"",
            email:"",
            password:""
        })
        navigate("/")
    }

    return(
        <>
        <div className="h-full w-full flex items-center justify-center">
            <form onSubmit={submiter} className="max-w-60 w-[90%] m-auto flex flex-col justify-center items-center">
                <input type="text" value={form.username} name="username" onChange={handlechange} className="w-full py-2 px-3 rounded-2xl bg-transparent border border-gray-400 text-white" placeholder="Username" />
                <input type="email" value={form.email} name="email" onChange={handlechange} className="w-full py-2 px-3 rounded-2xl bg-transparent border border-gray-400 text-white" placeholder="Email" />
                <input type="password" value={form.password} name="password" onChange={handlechange} className="w-full py-2 px-3 rounded-2xl bg-transparent border border-gray-400 text-white" placeholder="Password"/>
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )


}

export default Register