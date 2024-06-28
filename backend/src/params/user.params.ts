/*@params createAccountParams 
Defines parameters to be used to create a user 
so in case we need additional data for user creation we just need to include
in the type params
*/
export type createAccountParams ={
    email : string,
    password : string,
    username : string
}

export type loginUserParams = {
    email :string ,
    password : string
}
