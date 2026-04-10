import usermodel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { type Request, type Response } from "express"

interface RegisterBody {
  username: string
  email: string
  password: string
}

type LoginBody = Omit<RegisterBody, "email">

export const registerUser=async(req:Request<{}, {}, RegisterBody>,res:Response)=>{
 

    const {username,email,password}=req.body

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

  const isUserExist=await usermodel.findOne({
    $or:[{username},{email}]
  })

  if(isUserExist){
    return res.status(400).json({message:"User already exists"})
  }



  const newUser=await usermodel.create({
    username,
    email,
    password,
  })

  const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET!,{expiresIn:"7d"})

  res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge:7*24*60*60*1000,
  })

  res.status(201).json({
    message:"User registered successfully",
user:{
    _id:newUser._id,
    username:newUser.username,
    email:newUser.email
}
})

}

export const loginUser=async(req:Request<{}, {}, LoginBody>,res:Response)=>{

    const {username,password}=req.body
    
    if(!username || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const user=await usermodel.findOne({username})

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const isPasswordValid=await user.comparePassword(password)

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid password"})
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET!,{expiresIn:"7d"})

    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
    })

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export const logoutUser=async(req:Request,res:Response)=>{
    res.clearCookie("token")
    res.status(200).json({message:"User logged out successfully"})
}

export const getme=async(req:Request,res:Response)=>{
    const user=await usermodel.findById((req as any).user?.id)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email
    })
}