import { Request,Response,NextFunction } from "express";
import {z} from "zod";
import ProblemModel from "../models/problem.model";
import { BadRequestError } from "../errors/BadRequestError";
// validation schemas 
export const problemSchema = z.object({
    title : z.string().min(4).max(25),
    statement : z.string().min(15),
    tags : z.array(z.string().min(2)).optional(),
    difficulty: z.enum(["Easy","Medium" ,"Hard"]),
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
        res.status(200).json({...details});
    }catch(error){
        next(error);
    }
}

export const fetchProblems =  async (req : Request , res : Response , next:NextFunction)=>{
    try{
        if(!req.query.page) throw new BadRequestError("Page not found");
        let query =  ProblemModel.find({ type : {$ne:'contest' }});
        const page = parseInt((typeof req.query.page== "string" )? req.query.page: "1");
        const pagesize = parseInt((typeof req.query.limit == "string")? req.query.limit:"50");
        const skip = (page-1)*pagesize;
        const total = await ProblemModel.countDocuments();
        
        const  totalPages = Math.ceil(total/pagesize);
        query = query.skip(skip).limit(pagesize);
        const result = await query;
        var data = [];
        for(var index in result){
            data.push(result[index].preview());
        }
        return res.status(200).json({
            status : "success",
            count : result.length,
            page,
            totalPages,
            data: data
        })
    }catch(error){
        next(error);
    }
}

export const searchProblem =  async (req : Request , res : Response , next:NextFunction)=>{
    try{
        const { searchTerm } = req.query; 
        if (!searchTerm || typeof searchTerm !== 'string') {
            throw new BadRequestError('Invalid Search Term');
        }
        const searchRegex = new RegExp(searchTerm, 'i');
        const problems = await ProblemModel.find({ title: searchRegex })
                                      .select('title description difficulty') 
        const previewOfProblems = problems.map(problem=> problem.preview())
        res.status(200).json({ message: 'Search results', results: previewOfProblems });
    }catch(error){
        console.log(error);
        next(error);
    }
}

export const deleteProblem = async (req : Request , res : Response , next:NextFunction)=>{
    try{
        const result = await ProblemModel.deleteOne({ admin_id: req.user._id , _id: req.body.p_id  });
        return res.status(200).json({message : 'Problem deleted succesfully' , result});
    }catch(error){
        next(error);
    }
}

export const getMyProblems = async (req : Request , res : Response , next:NextFunction)=>{
    try{
        const problems = await ProblemModel.find({admin_id: req.user._id}).select('title statement difficulty'); 
        res.status(200).json({problems : problems || []});
    }catch(error){
        next(error);
    }
}
