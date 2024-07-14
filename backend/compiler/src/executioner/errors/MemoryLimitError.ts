
import { MEMORY_LIMIT_ERROR } from "../../constants";
import { CompilerError } from "../../types/CompilerError";

export class MemoryLimitError extends CompilerError{
    constructor(message :string){
        super(message);
        Object.setPrototypeOf(this , MemoryLimitError.prototype);
    }
    statusCode = MEMORY_LIMIT_ERROR;
     setStatuscode(code:string|number): void {
        this.statusCode = code;
    }
    serialize(){
        return {  statusCode  : this.statusCode , output : this.message };
    }
}
