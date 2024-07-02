import API from "@/config/APIClient";
export const login = async (data:{email : string , password : string})=> API.post("/auth/login", data);
export const signup = async (data: {username : string , email : string , password : string })=> API.post("/auth/signup",data);
export const getProblems = async (data:number)=> API.get(`problems/?page=${data}`)
export const fetchProblem = async (data:string) => API.get(`problems/${data}`);
export const submitSolution = async(data:{code:string , language:string , p_id:string}) => API.post(`/submissions/new/${data.p_id}`,data)
export const runCode = async(data:{code:string , language:string , testcases:string[]}) => API.post(`/submissions/run`,data)