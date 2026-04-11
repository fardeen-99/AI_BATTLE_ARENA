import {type Response , type Request,type NextFunction} from "express"


const ErrorMiddleware=async(err:any,req:Request,res:Response,next:NextFunction)=>{

    err.statusCode=err.statusCode||500
    err.message=err.message||"Internal server error"

    res.status(err.statusCode).json({
        message:err.message,
        stack:err.stack,
    })

}

export default ErrorMiddleware