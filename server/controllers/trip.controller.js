import tripService, {getTripsByDriverService} from "../services/trip.service.js";
import { GenericController } from "./generic/generic.controller.js";


export const getTripsByDriver = async (req, res) => {
    try {
        const { driverId } = req.params;

        const trips = await getTripsByDriverService(driverId);

        return res.status(200).json({
            success: true,
            data: trips,
            message: `Found ${trips.length} trips for driver`,
        });
    } catch (error) {
        console.error("Error getting driver trips:", error);

        return res.status(
            error.message === "Driver ID is required" ? 400 : 500
        ).json({
            success: false,
            message: error.message || "Server error while fetching driver trips",
        });
    }
};


export default GenericController(tripService);
