import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api").replace(/\/+$/, "");

const API = axios.create({
    baseURL: `${API_BASE}/github`
});

export const syncGithub = (data) => {
    return API.post("/sync", data);
};
