import { TIME_LIMIT_ERROR } from "../../constants";
import { CompilerError } from "../../types/CompilerError";

export class TimeLimitError extends CompilerError{
    constructor(message :string){
        super(message);
        Object.setPrototypeOf(this , TimeLimitError.prototype);
    }
    statusCode = TIME_LIMIT_ERROR;
     setStatuscode(code:string|number): void {
        this.statusCode = code;
    }
    serialize(){
        return { status_code  : this.statusCode , message : this.message };
    }
}
