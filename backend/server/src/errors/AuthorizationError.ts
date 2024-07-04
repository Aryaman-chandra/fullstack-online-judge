import { AppError }  from "../utils/AppError";
export class AuthorizationError extends AppError{
    statusCode = 403;
    constructor(message :string){
        super(message);
        Object.setPrototypeOf(this , AuthorizationError.prototype);
    }
    serialize():{ message:string } {
        return { message : this.message };  
    }
}
