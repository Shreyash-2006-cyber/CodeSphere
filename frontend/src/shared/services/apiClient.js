import axios from "axios";

// Single Axios instance for the whole app. Once a backend exists,
// only baseURL/interceptors here need to change — features already
// import their calls through this client.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("cs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized place to handle 401s, toasts, etc. once wired to a backend.
    return Promise.reject(error);
  }
);
