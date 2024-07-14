import {  NextFunction, Request, Response } from "express";
import Job from './types/job'
import {  generateInputFile, generateOutputFile } from "./generateFile";
import executionerFactory from "./executioner/executionerFactory";
import executioner from "./types/executioner";
import { CompilationError } from "./executioner/errors/CompilationError";
import { TimeLimitError } from "./executioner/errors/TimeLimitError";
import z from "zod"
import { MemoryLimitError } from "./executioner/errors/MemoryLimitError";
import { SUCCESS } from "./constants";

const JobSchema = z.object({
    code : z.string().min(1),
    input : z.array(z.string().min(1)),
    language: z.enum(['cpp','java','python']),
    time_limit: z.number().optional(),
    memory_limit: z.number().optional(),
})
export const execute = async ( req: Request<any, any , Job> , res : Response , next : NextFunction) =>{
    try{
        const valid = JobSchema.parse({ ...req.body });
        const filePath =  generateOutputFile(valid.language , valid.code);
        const result:executioner = executionerFactory.get(filePath,valid.language , Math.min(valid.time_limit ?? 5,12) , Math.min(valid.memory_limit ?? 128,128)); 
        let output : string[]= [];
        for(var index in valid.input){
            const inputFilePath = generateInputFile(valid.input[index]);
            try{
            await result.compile();
            const message = await result.execute(inputFilePath);
            output.push(message);
            }catch(error){
                if(error instanceof TimeLimitError) throw new TimeLimitError(`Time Limit Exceeded on : testcase ${index}`)
                else if(error instanceof MemoryLimitError) throw new MemoryLimitError(`Memory Limit Exceeded on : testcase ${index}`)
                throw error
            }
        }
        return res.status(200).json({ statusCode : SUCCESS , output   } );        
    }catch(error:any){
        let body:any = { status_code : 400 , message : error.message } ;
        if(error instanceof CompilationError) body = error.serialize();
        if(error instanceof TimeLimitError) body  = error.serialize();
        if(error instanceof MemoryLimitError) body = error.serialize();
        return res.status(400).json(body);
    }
}
