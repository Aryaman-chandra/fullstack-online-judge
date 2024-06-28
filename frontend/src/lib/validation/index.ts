import * as z from "zod";
export const SignupValidation= z.object({
    username : z.string().min(2,{message:"Username must be 2 characters long"}),
    email : z.string().min(2).email(),
    password : z.string().min(8 , {message: "password must be 8 characters long "})
  })
  export const SigninValidation= z.object({
    email : z.string().min(2).email(),
    password : z.string().min(8 , {message: "password must be 8 characters long "})
  })