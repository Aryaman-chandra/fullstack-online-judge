import { Request, Response,  NextFunction } from "express";
import z from "zod";
import SubmissionModel from "../models/submission.model";
import ProblemModel from "../models/problem.model";
import { BadRequestError } from "../errors/BadRequestError";
import { compile_and_run } from "../services/compile_and_run";
import { Executable } from "../types/compiler/executable";
const submissionSchema = z.object({
    code : z.string().min(1),
    language : z.string().min(1)
})
export const  mySubmissions = async ( req : Request , res: Response , next : NextFunction)=>{
    try{
        const submissions = await SubmissionModel.findOne({ user : req.user._id });
        res.status(200).json(submissions);

    }catch(error){
        next(error);
    }
}

export const newSubmission  = async ( req : Request , res: Response , next : NextFunction)=>{
    try{
        const valid = submissionSchema.parse({
            ...req.body,
        })
        const submission = await SubmissionModel.create({ user : req.user.id , source : valid.code } );
        const problem = await ProblemModel.findById(req.query.p_id);
        if(!problem) throw new BadRequestError('Problem Not Found');
        const executeJob :Executable= {
            code :  valid.code,
            language : valid.language,
            input : problem.getTestCases()
        }
        const result = await compile_and_run(executeJob); 
        return res.status(200).json(result);
    }catch(error){
        next(error);
    }
}

export const runTestCases = async ( req : Request , res: Response , next : NextFunction)=>{
    try{
        const valid = { ...req.body } ;
        const inputData = valid.testcases.map((testcase:any)=>{ return testcase.input})
        const executeJob : Executable = {
            code : valid.code ,
            language : valid.language,
            input : inputData 
        }
        const result = await compile_and_run(executeJob);
        return res.status(200).json(result);
    }
    catch(error){
        next(error)
    }
}
