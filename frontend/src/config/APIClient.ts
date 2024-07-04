import axios from "axios";
import { useQueryClient } from "./queryClient";
import { navigate } from "@/lib/navigation";


const options = {
    baseURL : import.meta.env.VITE_SERVER_URL,
    withCredentials : true,
}

const TokenRefreshClient =axios.create(options);
TokenRefreshClient.interceptors.response.use( (response)=> response.data)

const API = axios.create(options);
const queryClient = useQueryClient();

API.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const {config , response } = error; 
        const { status ,data } = response 
        if(status===401 && data?.message==='Invalid token'){
            try {
               await TokenRefreshClient.get("/auth/refresh");
               return TokenRefreshClient(config)
            } catch (error) {
                queryClient.clear();
                navigate("/auth/sign-in",{
                    state:{
                        redirectUrl: window.location.pathname,
                    }
                })
            }
        }
        return Promise.reject({status , ...data});
    }
)


export default API;
