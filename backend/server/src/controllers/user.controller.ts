import { Request, Response,  NextFunction } from "express";
import z from "zod";
import UserModel from "../models/user.model";
import { AuthenticationError } from "../errors/AuthenticationError";
import ProblemModel from "../models/problem.model";
import SubmissionModel from "../models/submission.model";
import mongoose from "mongoose";
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

export const linkProblem = async ( req : Request , res : Response, next: NextFunction)=>{
   try {
        const link = { ...req.body };
        const source = await ProblemModel.findById(link.source);
        const target = await ProblemModel.findById(link.target); 
        if(!(source && target)) throw new Error('Problem Does not exist');
         const user = await UserModel.findOne({email : req.user.email } );
         let linkBool = false;
         for(const blink of user!.links!){
            if(blink.source.toString()===link.source && blink.target.toString()===link.target)
                linkBool = true;
         }
         let sourceBool = false;
         let targetBool = false;
         for( const index of user?.nodes!){
            if(index.id===link.source) sourceBool = true;
            if(index.id===link.target) targetBool = true;
         }
         if(!sourceBool) 
             user?.nodes.push({ title: source.title,id : link.source , group : source.difficulty });
         if(!targetBool)
             user?.nodes.push({ title: target.title , id : link.target , group : target.difficulty });
         if(!linkBool)
             user!.links.push({source : link.source , target : link.target}) ;

         user?.save();
        res.status(200).json({ message : "Link added"  });
   } catch (error) {
        next(error); 
   } 
}

export const getGraph =  async ( req : Request , res : Response, next: NextFunction)=>{
    try{
        const data = { links : req.user.links , nodes:req.user.nodes } ;
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
}

export const getStats = async ( req : Request , res : Response, next: NextFunction)=>{
    try {
         const userId = req.user._id;
         const result = await SubmissionModel.aggregate([
      {
        $match: {
          user: userId,
          verdict: "ACCEPTED"
        }
      },
      {
        $group: {
          _id: "$problem"
        }
      },
      {
        $count: "acceptedProblemCount"
      }
    ]);

    const totalSubmissions = await SubmissionModel.find({ user : userId }).countDocuments();  
     const solved = result.length > 0 ? result[0].acceptedProblemCount : 0;
     return res.status(200).json({ solved ,totalSubmissions});
    } catch (error) {
        next(error);        
    }
}
