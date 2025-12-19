import { api } from "../../api";

export const maintenanceApi = {
  getMaintenance: async () => {
    const response = await api.get("/maintenances");
    return response.data;
  },

  createMaintenance: async (maintenanceData) => {
    const response = await api.post("/create-maintenance", maintenanceData);
    return response.data;
  },

  updateMaintenance: async (id, maintenanceData) => {
    const response = await api.put(
      `/update-maintenance/${id}`,
      maintenanceData
    );
    return response.data;
  },

  deleteMaintenance: async (id) => {
    const response = await api.delete(`/delete-maintenance/${id}`);
    return response.data;
  },
};
