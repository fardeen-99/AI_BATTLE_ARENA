import { Schema,Document } from "mongoose"
import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
// type userType=Document&{
//     username:string,
//     email:string,
//     password:string,
// }

interface userType extends Document{
    username:string,
    email:string,
    password:string,
    comparePassword(password:string):Promise<boolean>
}

const userSchema:Schema<userType>=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword=async function(password:string){
    return await bcrypt.compare(password,this.password)
}

const usermodel=mongoose.model<userType>("user",userSchema)

export default usermodel

