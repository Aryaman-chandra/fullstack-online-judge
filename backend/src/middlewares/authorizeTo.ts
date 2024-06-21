import {  Request , Response , NextFunction } from "express" ;
import { AuthenticationError } from "../errors/AuthenticationError";
            
export const authorizeTo = (...roles: any) => {
  return (req:Request , res : Response, next:NextFunction) => {
    try{
    const userRoles = req.user.role;
    if (roles.include(userRoles)) {
      throw new AuthenticationError('UnAuthorized');
    }
    next();
    }catch(error){
        next(error);
    }
  };
};
