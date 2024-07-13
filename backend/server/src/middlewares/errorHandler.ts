import { ErrorRequestHandler , Request , Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";
export const errorHandler : ErrorRequestHandler =(
    error : Error, 
    req : Request,
    res : Response,
    next: NextFunction
) =>{
    // Handle Errors Here
    if(error instanceof AppError){
        return res.status(error.statusCode).json(error.serialize())
    }
    if(error instanceof ZodError){
        return res.status(400).json({ type : "Validation Error" , message : error.flatten() });
    }
    else 
    return res.status(500).json({message : error.message , stack : error.stack});

};
