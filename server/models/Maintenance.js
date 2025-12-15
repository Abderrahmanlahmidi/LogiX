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

    description: String,
    cost: String,
    date: Date,
    kmAtMaintenance: Number

}, { timestamps: true });

const Maintenance = mongoose.model("Maintenance", MaintenanceSchema);
export default Maintenance;
