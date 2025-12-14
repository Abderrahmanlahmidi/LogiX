import { GenericService } from "./generic/generic.service.js";
import Model from "../models/index.js";


export const getTripsByDriverService = async (driverId) => {
    if (!driverId) {
        throw new Error("Driver ID is required");
    }

    const trips = await Model.Trip.find({ driverId })
        .populate("truckId", "plateNumber brand model currentKm status type")
        .populate("trailerId", "plateNumber brand model currentKm status type")
        .sort({ startDate: -1 })
        .lean();

    return trips;
};


export default GenericService(Model.Trip);
