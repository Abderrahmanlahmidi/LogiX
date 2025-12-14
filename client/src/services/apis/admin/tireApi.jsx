import { api } from "../../api"

export const tiresApi = {
  getTires: async () => {
    const res = await api.get("/tires");
    return res.data;
  },

  createTire: async (tireData) => {
    const res = await api.post("/create-tire", tireData);
    return res.data;
  },

  updateTire: async (id, tireData) => {
    const res = await api.put(`/update-tire/${id}`, tireData);
    return res.data;
  },

  deleteTire: async (id) => {
    const res = await api.delete(`/delete-tire/${id}`);
    return res.data;
  },
};