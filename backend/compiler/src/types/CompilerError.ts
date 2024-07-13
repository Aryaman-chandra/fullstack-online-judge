import { EXECUTION_ERROR } from "../constants";

export abstract class CompilerError extends Error{
    constructor(public message : string){
        super(message);
        this.message = message;
    }
    abstract statusCode : number | string ;
    abstract setStatuscode(code:number|string) : void;
    abstract serialize() : { statusCode: string | number ,  output : string } ;
}
