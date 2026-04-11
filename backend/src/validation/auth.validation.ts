import {body,validationResult} from "express-validator"
import {type Request,type Response,type NextFunction} from "express"

const validation=(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}


const RegisterValidation=[
    body("name").trim().notEmpty().withMessage("Name is required").isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    validation
]

const LoginValidation=[
    body("username").trim().notEmpty().withMessage("username is required"),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    validation
]

export {RegisterValidation,LoginValidation}