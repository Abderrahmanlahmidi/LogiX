import { api } from "../api";

export const userInfo = async (id) => {
  const res = await api.get(`/user/${id}`);  
  return res.data;
};


export const updateProfile = async (id, data) => {
  const res = await api.put(`/update-profile/${id}`, data);
  return res.data;
};

export const changePassword = async (id, data) => {
  const res = await api.put(`/change-password/${id}`, data);
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data
}