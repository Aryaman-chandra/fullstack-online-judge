import { Request,Response,NextFunction } from "express";
import {z} from "zod";
import ProblemModel from "../models/problem.model";
import { BadRequestError } from "../errors/BadRequestError";
// validation schemas 
const problemSchema = z.object({
    title : z.string().min(4).max(12),
    statement : z.string().min(15).max(300),
    testcases : z.array(z.object({
        input  : z.string(),
        output : z.string()
    })),
    time_limit : z.number(),
    memory_limit : z.number()
})
export const createProblem = async (req : Request , res : Response , next:NextFunction)=>{
    try{
        var result = problemSchema.parse({
            ...req.body
        });
        let temp = {
            ...result,
            admin_id : req.user._id
        }
        const problem = await ProblemModel.create(temp);
        return res.status(200).json({message : 'problem created succesfully'});
    }catch(error){
        next(error);
    }
}
export const getThisProblem = async (req : Request , res : Response , next:NextFunction)=>{
    try{
        if(!req.params.p_id) throw new BadRequestError("Problem id is missing");
        const problem = await ProblemModel.findById(req.params.p_id);
        if(!problem) throw new BadRequestError("Problem not found");
        const details =  problem.omitTestCases();
        res.status(200).json({details});
    }catch(error){
        next(error);
    }
}
export const fetchProblems =  async (req : Request , res : Response , next:NextFunction)=>{
    try{
        if(!req.query.page) throw new BadRequestError("Page not found");
        let query =  ProblemModel.find();
        const page = parseInt((typeof req.query.page== "string" )? req.query.page: "1");
        const pagesize = parseInt((typeof req.query.limit == "string")? req.query.limit:"50");
        const skip = (page-1)*pagesize;
        const total = await ProblemModel.countDocuments();
        
        const  pages = Math.ceil(total/pagesize);
        query = query.skip(skip).limit(pagesize);
        const result = await query;
        return res.status(200).json({
            status : "success",
            count : result.length,
            page,
            pages,
            data:result
        })
    }catch(error){
        next(error);
    }
}
