import { AppError }  from "../utils/AppError";
export class AuthenticationError extends AppError{
    statusCode = 401;
    constructor(message :string){
        super(message);
        Object.setPrototypeOf(this , AuthenticationError.prototype);
    }
    serialize():{ message:string } {
        return { message : this.message };  
    }
}
