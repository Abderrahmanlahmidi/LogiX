import { api } from "../../api";

export const maintenanceRulesApi = {

  getMaintenanceRules: async () => {
    const res = await api.get("/maintenance-rules");
    return res.data;
  },

  createMaintenanceRule: async (maintenanceRuleData) => {
    const res = await api.post("/create-maintenance-rule", maintenanceRuleData);
    return res.data;
  },

  updateMaintenanceRule: async (id, maintenanceRuleData) => {
    const res = await api.put(`/update-maintenance-rule/${id}`, maintenanceRuleData);
    return res.data;
  },

  deleteMaintenanceRule: async (id) => {
    const res = await api.delete(`/delete-maintenance-rule/${id}`);
    return res.data;
  },

};