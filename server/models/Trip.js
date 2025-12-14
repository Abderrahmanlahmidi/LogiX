import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    truckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    trailerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    startLocation: String,
    endLocation: String,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ["pending", "active", "done", "canceled"] },
    fuelLiters: Number,
    remarks: String
}, { timestamps: true });

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
