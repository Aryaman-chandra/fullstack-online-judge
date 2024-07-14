import { Request, Response,  NextFunction } from "express";
import z from "zod";
import SubmissionModel from "../models/submission.model";
import ProblemModel from "../models/problem.model";
import { BadRequestError } from "../errors/BadRequestError";
import { compile_and_run } from "../services/compile_and_run";
import { Executable } from "../types/compiler/executable";
import mongoose from "mongoose";
const submissionSchema = z.object({
    code : z.string().min(1),
    language : z.string().min(1)
})

export const  mySubmissions = async ( req : Request , res: Response , next : NextFunction)=>{
    try{
        const submissions = await SubmissionModel.find({ user : req.user._id }).populate('problem','title').sort({createdAt:-1});
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
        const p_id: string = req.params.p_id;
        const problem = await ProblemModel.findById(p_id);
        if(!problem) throw new BadRequestError('Problem Not Found');
        const submission = await SubmissionModel.create({ user : req.user.id , source : valid.code , problem: problem._id } );
        const executeJob :Executable= {
            code :  valid.code,
            language : valid.language,
            input : problem.getTestCases(),
            time_limit : problem.time_limit,
            memory_limit : problem.memory_limit,
        }
        const result = await compile_and_run(executeJob); 
        if(result.status!==200){
            submission.verdict = result.status;
            submission.save();
            return res.status(200).json({ ...result , verdict : result.status });
        }

        for(let i = 0 ; i < problem.testcases.length ; i++){
            const expectedOutput  = problem.testcases[i].output.replace(/[\r\n]+/g, ' ').trim();
            const output = result.output[i].replace(/[\r\n]+/g, ' ').trim();
            if(expectedOutput!== output){
                submission.verdict = `WRONG ANSWER`;  
                submission.save();
                return res.status(200).json( { status : 100 , output : `Wrong Answer on Testcase ${i+1}\nexpected: ${expectedOutput} | got : ${output}`, verdict: "WRONG ANSWER" }) ;
            }
        }
        submission.verdict = "ACCEPTED";
        submission.save();
        return res.status(200).json( { status : 200 , output : "All testcases passed" ,verdict :"ACCEPTED" } );
    }catch(error){
        next(error);
    }
}

export const runTestCases = async ( req : Request , res: Response , next : NextFunction)=>{
    try{
        const valid = { ...req.body } ;
        const inputData:string[] = [req.body.testcases]; 
        const executeJob : Executable = {
            code : valid.code ,
            language : valid.language,
            input : inputData, 
            time_limit: 1,
            memory_limit: 128,
        }
        const result = await compile_and_run(executeJob);
        return res.status(200).json(result);
    }
    catch(error){
        next(error)
    }
}

