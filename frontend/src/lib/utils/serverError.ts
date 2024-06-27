export default interface ServerError extends Error{
    status : number,
    message : string
}