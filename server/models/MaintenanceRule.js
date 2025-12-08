import mongoose from "mongoose";

const MaintenanceRuleSchema = new mongoose.Schema({
    type: { type: String, enum: ["oil", "filter", "tire", "brake"], required: true },
    recommendedKm: Number
}, { timestamps: true });

const MaintenanceRule = mongoose.model("MaintenanceRule", MaintenanceRuleSchema);
export default MaintenanceRule;
