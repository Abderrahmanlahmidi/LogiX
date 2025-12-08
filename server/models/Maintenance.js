import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
    maintenanceRuleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaintenanceRule",
        required: true
    },
    description: String,
    cost: String,
    date: Date,
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    kmAtMaintenance: Number,
    targetType: { type: String, enum: ["truck", "trailer"] }
}, { timestamps: true });

const Maintenance = mongoose.model("Maintenance", MaintenanceSchema);
export default Maintenance;
