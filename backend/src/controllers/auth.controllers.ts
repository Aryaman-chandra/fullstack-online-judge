
import { AuthenticationError } from "../errors/AuthenticationError";
import {z} from 'zod';
import { createAccount, login } from "../services/auth.service";
import { NextFunction, Request, Response } from "express";
import { setAuthCookies } from "../utils/cookies";


// Validation Schemas 
const signupSchema = z.object({
    email : z.string().email().min(1).max(255),
    password : z.string().min(6).max(255),
})
const loginSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255)
})


export async function  signupHandler( req : Request , res : Response ,next : NextFunction ){
    try{    
    const request = signupSchema.parse({
            ...req.body,
        })
        const data = request 
        const user = await createAccount(data);
        return setAuthCookies( res , user.accessToken).status(200).json({user});
    }catch(error){
        next(error);
    }
}

export async function loginHandler( req : Request , res : Response , next : NextFunction ){
    try{
        const request = loginSchema.parse({
            ...req.body
        })
        //Log a user in 
        const user = await login(request);
        return setAuthCookies( res , user.accessToken).status(200).json({user});
    }catch(error){
        next(error)
    }
}
export  function logoutHandler( req: Request , res: Response , next: NextFunction ){
        try{
        if(!req.cookies.token) throw new AuthenticationError('No logged in Session');
        return res.cookie('token','', { maxAge: 15}).status(200).send();
        }catch(error){
            next(error);
        }
}
