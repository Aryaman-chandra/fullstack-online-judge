import { User } from "./dtos/user"
// Here what we are doing is that we are extending our request interface
// to have a custom user property similarly to passport js 
// so that we can directly just use req.user whenever we want
import * as express from "express-serve-static-core";
declare global {
         namespace Express{
         export interface Request{
            user?: User,
        }
    }
}
