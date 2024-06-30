import { AppError } from "../utils/AppError";
export class BadRequestError extends AppError{
    statusCode: number = 400;
    constructor(message : string){
        super(message);
    }
    serialize(): { message: string; } {
        return {message : this.message};
    }
}