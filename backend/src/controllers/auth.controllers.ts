
import { AuthenticationError } from "../errors/AuthenticationError";
import {z} from 'zod';
import { createAccount } from "../services/auth.service";
import { NextFunction, Request, Response } from "express";



const signupSchema = z.object({
    email : z.string().email().min(1).max(255),
    password : z.string().min(6).max(255),
})
export async function  SignupHandler( req : Request , res: Response ,next:NextFunction){
    try{    
    const request = signupSchema.parse({
            ...req.body,
        })
        //call service 

        //auth create user
        const data = {
            ...req.body
        }
        const user = await createAccount(data);
        res.status(200).json({user});
    }catch(error){
        next(error);
    }
}