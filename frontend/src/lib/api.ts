import API from "@/config/APIClient";
export const login = async (data:{email : string , password : string})=> API.post("/auth/login", data);
export const signup = async (data: {username : string , email : string , password : string })=> API.post("/auth/signup",data);
export const getProblems = async (data:number)=> API.get(`problems/?page=${data}`)