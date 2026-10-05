import axios from "axios";

export const api = axios.create({ baseURL: "/api" });

api.interceptors.response.use(r => r, err => {
  const url = err.config?.url ?? "";
  const isAuthCall = url.startsWith("/auth/login") || url === "/me";
  if (err.response?.status === 401 && !isAuthCall) window.location.href = "/login";
  return Promise.reject(err);
});