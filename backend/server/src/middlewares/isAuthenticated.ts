import { Request, Response, NextFunction } from "express-serve-static-core"
import { AuthenticationError } from "../errors/AuthenticationError"
import UserModel from "../models/user.model";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { User } from "../dtos/user";
var secret: string = process.env.JWT_SECRET!;
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
            //check for toke 
            if (req.cookies.token == undefined) throw new AuthenticationError("UnAuthorized");
            const   decoded = jwt.verify(req.cookies.token, secret);
            // check for valid token
            if(typeof decoded == "string") throw new AuthenticationError("invalid token");
            //attach user
            const user = await UserModel.findOne({ email: decoded.tokenUser.email })
           req.user = user as User;
           next();

    } catch (error) {
        if(error instanceof TokenExpiredError || error instanceof JsonWebTokenError){
            next(new AuthenticationError('token expired'));
        }   
        else
        next(error);
    }
}
