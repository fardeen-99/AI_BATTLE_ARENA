import { useState } from "react"
import { type LoginForm } from "../../types/auth.types.js"
import useAuth from "../hooks/auth.hook"
import { useSelector } from "react-redux"
import type {RootState} from "../../../store/store.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const Login=()=>{
    const {user}=useSelector((state:RootState)=>state.auth)
    const navigate=useNavigate()
    
useEffect(()=>{
    if(user){
        navigate("/")
    }
},[])

    const [form,setform]=useState<LoginForm>({
        username:"",
        password:""
    })

    const {handlelogin}=useAuth()

    const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
const {name,value}=e.target

setform(prev=>({...prev,[name]:value}))

    }

    const submiter=async(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        await handlelogin(form) 
        setform({
            username:"",
            password:""
        })
        navigate("/")



        
    }

    return(
        <>
        <div className="h-full w-full flex items-center justify-center">


            <form
            onSubmit={submiter}
            
            className="max-w-60 w-[90%] m-auto flex flex-col justify-center items-center"
            >
                <input type="text" value={form.username} name="username" onChange={handlechange} className="w-full py-2 px-3 rounded-2xl bg-transparent border border-gray-400 text-white" placeholder="Username" />
                <input type="password" value={form.password} name="password" onChange={handlechange} className="w-full py-2 px-3 rounded-2xl bg-transparent border border-gray-400 text-white" placeholder="Password"/>
                <button type="submit">Login</button>
            </form>

        </div>


        </>
    )


}

export default Login