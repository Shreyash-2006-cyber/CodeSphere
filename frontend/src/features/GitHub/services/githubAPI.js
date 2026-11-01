import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5001/api/github"
});

export const syncGithub=(data)=>{
    return API.post("/sync",data);
}