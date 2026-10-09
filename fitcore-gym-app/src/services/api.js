import axios from "axios";
import API_URL from "../config/api";

const api = axios.create({
    baseURL:API_URL,
    headers:
    {
        "Content-Type":"application/json"
    }
});

api.interceptors.request.use(
    ()=>{
        
    }
)
export default api;