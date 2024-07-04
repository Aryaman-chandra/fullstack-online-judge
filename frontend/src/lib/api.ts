import API from "@/config/APIClient";
import { problemSchema, ProfileSchema } from "./validation";
import { z } from "zod";
export const login = async (data:{email : string , password : string})=> API.post("/auth/login", data);
export const signup = async (data: {username : string , email : string , password : string })=> API.post("/auth/signup",data);
export const logout = async ()=> API.get("/auth/logout");
export const getUser = async ()=> API.get("/user/me");
export const refresh = async () => API.get("/auth/refresh");
export const getProblems = async (data:number)=> API.get(`problems/?page=${data}`)
export const fetchProblem = async (data:string) => API.get(`problems/${data}`);
export const submitSolution = async(data:{code:string , language:string , p_id:string}) => API.post(`/submissions/new/${data.p_id}`,data)
export const runCode = async(data:{code:string , language:string , testcases:string[]}) => API.post(`/submissions/run`,data)
export const updateProfile = async(data:z.infer<typeof ProfileSchema>) => API.post('user/profile',data);
export const createProblem = async(data:z.infer<typeof problemSchema>) => API.post('problems/create',data);
