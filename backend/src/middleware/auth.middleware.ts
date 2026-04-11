import jwt from "jsonwebtoken"
import {type Request,type Response,type NextFunction} from "express"
import {configuration} from "../config/config.js"
export const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>{

    try{

const token=req.cookies?.token

if(!token){
    return res.status(401).json({message:"Unauthorized"})
}

const secret=configuration.jwt_secret

if(!secret){
    return res.status(500).json({message:"Internal server error"})
}


let decoded:any;
try {
     decoded=jwt.verify(token,secret);
    (req as any).user=decoded
    next()

} catch (error) {
    return res.status(401).json({message:"Unauthorized"})
}

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }

}
