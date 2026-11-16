import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api").replace(/\/+$/, "");

const API = axios.create({
    baseURL: API_BASE
});

export const getGithubProfile = (username) =>
    API.get(`/github/${username}`);
