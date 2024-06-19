import { ErrorRequestHandler , Request , Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
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
    else 
    return res.status(500).json({message : error.message});

};
