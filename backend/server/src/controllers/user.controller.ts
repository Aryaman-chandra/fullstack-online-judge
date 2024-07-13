import { Request, Response,  NextFunction } from "express";
import z from "zod";
import UserModel from "../models/user.model";
import { AuthenticationError } from "../errors/AuthenticationError";
// Validation Schemas
const profileSchema = z.object({
      fullname : z.string(),
      languages : z.string().array(),
      bio : z.string().optional(),
      picture : z.string().optional(),
      social_media_links : z.object({ handle : z.string() , url : z.string()}).array()
})


export const userDetails = async ( req : Request , res : Response , next : NextFunction )=>{
    try{
        const   { username , role , profile}= req.user;
        const details = {
            username,
            role,
            profile,
        }
        return res.status(200).json(details);
    }catch(error){
        next(error);
    }
}

export const getProfile = async ( req : Request , res : Response , next : NextFunction )=>{
       try{
       return res.status(200).json({ profile : req.user.profile }); 
       }catch(error){
           next(error);
       }
}

export const editProfile = async ( req : Request , res : Response, next: NextFunction)=>{
    try{
        const request = profileSchema.parse({
            ...req.body,
        })
        let user = await UserModel.findById(req.user._id);
        if(!user) throw new AuthenticationError('No user found');
        user.profile = request;
        user.save();
        return res.status(200).json({ message : "User profile updated" });
    }catch(error){
        next(error);
    }
}
