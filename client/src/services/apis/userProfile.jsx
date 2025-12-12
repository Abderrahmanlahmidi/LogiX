import { api } from "../api";

export const userInfo = async (id) => {
  const res = await api.get(`/user/${id}`);  
  return res.data;
};
