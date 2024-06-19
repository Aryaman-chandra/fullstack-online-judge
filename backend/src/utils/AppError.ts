
/**
 * @params string defines the custom message for various app errors
    A custom class to classify all app related errors
*/

export abstract class AppError extends Error{
    constructor(public message : string){
        super(message);
    }
    abstract statusCode : number ;
    abstract serialize() : { message : string } ;
}
