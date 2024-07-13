import { COMPILATION_ERROR } from "../../constants";
import { CompilerError } from "../../types/CompilerError";

export class CompilationError extends CompilerError{
    constructor(message :string){
        super(message);
        Object.setPrototypeOf(this , CompilationError.prototype);
    }
    statusCode = COMPILATION_ERROR;
     setStatuscode(code:string|number): void {
        this.statusCode = code;
    }
    serialize(){
        return { status_code  : this.statusCode , message : this.message };
    }
}
