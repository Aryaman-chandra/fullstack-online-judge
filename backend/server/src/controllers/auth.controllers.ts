
import { AuthenticationError } from "../errors/AuthenticationError";
import {z} from 'zod';
import { createAccount, login } from "../services/auth.service";
import { NextFunction, Request, Response } from "express";
import { setAuthCookies } from "../utils/cookies";
import  jwt, { JsonWebTokenError, TokenExpiredError }  from "jsonwebtoken";
const refreshSecret = process.env.JWT_REFRESH_SECRET!;
const  secret = process.env.JWT_SECRET!;

// Validation Schemas 
const signupSchema = z.object({
    username: z.string().min(3).max(25),
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
        return setAuthCookies( res , user.accessToken , user.refreshToken).status(200).json({user});
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
        return setAuthCookies( res , user.accessToken ,user.refreshToken ).status(200).json({user} );
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
export function refreshAccessToken(req:Request , res: Response , next: NextFunction){
       try{
           if(req.cookies.refreshToken==undefined) throw new AuthenticationError('Session Expired ! Please login instead');
           const decoded = jwt.verify(req.cookies.refreshToken , refreshSecret );
           const token = jwt.sign(decoded , secret);
           return setAuthCookies(res , token , req.cookies.refreshToken).status(200).json({user:{token ,refreshToken:req.cookies.refreshToken}});
       }catch(error){
        if(error instanceof TokenExpiredError) 
            next(new AuthenticationError('Session Expired ! Please login '));
        next(error);
       }
}
