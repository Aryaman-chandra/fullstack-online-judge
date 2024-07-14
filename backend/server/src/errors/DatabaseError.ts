
import { AppError }  from "../utils/AppError";
export class DataBaseError extends AppError{
    statusCode = 409;
    constructor(message :string){
        super(message);
        Object.setPrototypeOf(this , DataBaseError.prototype);
    }
    serialize():{ message:string } {
        return { message : this.message };  
    }
}
