import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api"
});

export const getGithubProfile = (username) =>
    API.get(`/github/${username}`);