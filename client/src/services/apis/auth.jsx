import { api } from "../api";

export const register = async (data) => {
    const res = await api.post("/register", data);
    return res.data;
}

export const login = async (data) => {
    const res = await api.post("/login", data);
    return res.data;
}