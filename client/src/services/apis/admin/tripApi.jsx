import { api } from "../../api";

export const tripApi = {
  getTrips: async () => {
    const res = await api.get("/trips");
    return res.data;
  },

  createTrip: async (tripData) => {
    const res = await api.post("/create-trip", tripData);
    return res.data;
  },

  updateTrip: async (id, tripData) => {
    const res = await api.put(`/update-trip/${id}`, tripData);
    return res.data;
  },

  deleteTrip: async (id) => {
    const res = await api.delete(`/delete-trip/${id}`);
    return res.data;
  },
};
