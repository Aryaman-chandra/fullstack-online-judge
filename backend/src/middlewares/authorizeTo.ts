import {  Request , Response , NextFunction } from "express" ;
import { AuthenticationError } from "../errors/AuthenticationError";
            
export const authorizeTo = (roles: string[]) => {
  return (req:Request , res : Response, next:NextFunction) => {
    try{
    const userRoles = req.user.role;
    if (roles.includes(userRoles)) {
      throw new AuthenticationError('UnAuthorized');
    }
    next();
    }catch(error){
        next(error);
    }
  };
};
