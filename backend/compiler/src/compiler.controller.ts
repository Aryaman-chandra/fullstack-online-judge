import {  NextFunction, Request, Response } from "express";
import Job from './types/job'
import {  generateInputFile, generateOutputFile } from "./generateFile";
import executionerFactory from "./executioner/executionerFactory";
import executioner from "./types/executioner";
import { CompilationError } from "./executioner/errors/CompilationError";
import { TimeLimitError } from "./executioner/errors/TimeLimitError";

export const execute = async ( req: Request<any, any , Job> , res : Response , next : NextFunction) =>{
    try{
        const valid = { ...req.body };
        const filePath =  generateOutputFile(valid.language , valid.code);
        const result:executioner = executionerFactory.get(filePath,valid.language); 
        let output : string[]= [];
        for(var index in valid.input){
            const inputFilePath = generateInputFile(valid.input[index]);
            const message = await result.execute(inputFilePath);
            output.push(message);
        }
        return res.status(200).json(output);        
    }catch(error:any){
        let body:any = { status_code : 400 , message : error.message } ;
        if(error instanceof CompilationError) body = error.serialize();
        if(error instanceof TimeLimitError) body  = error.serialize();
        return res.status(400).json(body);
    }
}
