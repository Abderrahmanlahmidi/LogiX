import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
    
  maintenanceRuleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceRule",
    required: true
  },

  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },

  targetType: {
    type: String,
    required: true
  },

  component: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "in_progress", "done", "canceled"],
    default: "pending"
  },

  description: String,
  cost: Number, 
  date: Date,
  kmAtMaintenance: Number
  
}, { timestamps: true });


const Maintenance = mongoose.model("Maintenance", MaintenanceSchema);
export default Maintenance;
