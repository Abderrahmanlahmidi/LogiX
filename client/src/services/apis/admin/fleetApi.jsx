import { api } from "../../api"

export const vehicleApi = {

  getVehicles: async () => {
    const res = await api.get("/vehicles");
    return res.data;
  },


  createVehicle: async (vehicleData) => {
    const res = await api.post("/create-vehicle", vehicleData);
    return res.data;
  },


  updateVehicle: async (id, vehicleData) => {
    const res = await api.put(`/update-vehicle/${id}`, vehicleData);
    return res.data;
  },


  deleteVehicle: async (id) => {
    const res = await api.delete(`/delete-vehicle/${id}`);
    return res.data;
  },

  getVehicleById: async (id) => {
    const res = await api.get(`/vehicles/${id}`);
    return res.data;
  }
};