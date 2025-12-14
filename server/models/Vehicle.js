import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    plateNumber: String,
    brand: String,
    model: String,
    currentKm: Number,
    status: { type: String, enum: ["active", "inactive", "maintenance"] },
    type: { type: String, enum: ["truck", "trailer"], required: true }
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
