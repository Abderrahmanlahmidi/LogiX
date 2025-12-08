import mongoose from "mongoose";

const TireSchema = new mongoose.Schema({
    serialNumber: Number,
    wearLevel: String,
    position: String,
    installedOn: { type: String, enum: ["truck", "trailer"] },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    }
}, { timestamps: true });

const Tire = mongoose.model("Tire", TireSchema);
export default Tire;
