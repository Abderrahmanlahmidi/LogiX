import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuthLogic } from "./apis/refreshLogic";


export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401]
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});
