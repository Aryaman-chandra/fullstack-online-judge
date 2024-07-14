import API from "@/config/APIClient";
import { contestSchema, problemSchema, ProfileSchema } from "./validation";
import { z } from "zod";
export const login = async (data:{email : string , password : string})=> API.post("/auth/login", data);
export const signup = async (data: {username : string , email : string , password : string })=> API.post("/auth/signup",data);
export const logout = async ()=> API.get("/auth/logout");
export const getUser = async ()=> API.get("/user/me");
export const refresh = async () => API.get("/auth/refresh");
export const getProblems = async (data:number)=> API.get(`problems/?page=${data}&&limit=4`)
export const fetchProblem = async (data:string) => API.get(`problems/${data}`);
export const submitSolution = async(data:{code:string , language:string , p_id:string}) => API.post(`/submissions/new/${data.p_id}`,data)
export const runCode = async(data:{code:string , language:string , testcases:string[]}) => API.post(`/submissions/run`,data)
export const updateProfile = async(data:z.infer<typeof ProfileSchema>) => API.post('user/profile',data);
export const createProblem = async(data:z.infer<typeof problemSchema>) => API.post('problems/create',data);
export const searchProblem = async(data:string) => API.get(`problems/search/?searchTerm=${data}`);
export const LinkProblems = async(data:{ source : string , target : string }) => API.post('user/link' ,data);
export const getGraph = async() => API.get('user/graph');
export const createContest = async(data:z.infer<typeof contestSchema>) =>API.post("contests/create",data);
export const getContests = async() => API.get("contests/");
export const getContest = async(data:string) => API.get(`contests/details/${data}`);
export const getAdminProblems = async() =>API.get("problems/my");
export const getAdminContests = async() =>API.get("contests/my");
export const updateContest = async(data:any)=> API.post(`contests/update/${data._id}`,data);
export const deleteProblem = async(data:{p_id :string}) =>API.post("problems/delete",data);
export const stats = async ()=> API.get("user/stats");
export const getSubmissions = async ()=>API.get("submissions/my");
