import mongoose from "mongoose";

const MaintenanceRuleSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["oil", "filter", "tire", "brake"],
            required: true,
        },

        recommendedKm: {
            type: Number,
            required: true,
        },

        recommendedMonths: {
            type: Number,
            default: null,
        },

        description: {
            type: String,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const MaintenanceRule = mongoose.model(
    "MaintenanceRule",
    MaintenanceRuleSchema
);

export default MaintenanceRule;
