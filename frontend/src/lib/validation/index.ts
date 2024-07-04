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
  
export  const ProfileSchema = z.object({
      fullname : z.string(),
      languages : z.string().array(),
      bio : z.string(),
      social_media_links : z.object({ handle : z.string() , url : z.string()}).array()
})

  
export const problemSchema = z.object({
  title: z.string().min(4).max(12),
  statement: z.string().min(15).max(300),
  testcases: z.array(z.object({
    input: z.instanceof(File),
    output: z.instanceof(File)
  })),
  time_limit: z.number().positive(),
  memory_limit: z.number().positive()
})
