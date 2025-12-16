import tripService, {getTripsByDriverService} from "../services/trip.service.js";
import { GenericController } from "./generic/generic.controller.js";
import Trip from "../models/Trip.js";
import Vehicle from "../models/Vehicle.js";



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

export const createTrip = async (req, res) => {
    try {
        const {
            driverId,
            truckId,
            trailerId,
            startLocation,
            endLocation,
            startDate,
            endDate,
            status = "pending",
            fuelLiters,
            remarks
        } = req.body;

        if (!driverId || !truckId || !trailerId || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({ message: "End date must be after start date" });
        }

        const conflicts = await Trip.find({
            status: { $ne: "canceled" },
            $or: [
                { driverId },
                { truckId },
                { trailerId }
            ],
            startDate: { $lt: endDate },
            endDate: { $gt: startDate }
        });

        if (conflicts.length > 0) {
            return res.status(409).json({
                message: "Driver, truck or trailer already assigned during this period"
            });
        }

        const trip = await Trip.create({
            driverId,
            truckId,
            trailerId,
            startLocation,
            endLocation,
            startDate,
            endDate,
            status,
            fuelLiters,
            remarks
        });

        res.status(201).json({
            status: "create successfully",
            data: trip
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const u = req.body;

    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Prevent changes if trip is done
    if (["done"].includes(trip.status))
      return res.status(400).json({ message: "Trip locked" });

    // Prevent changing resources while active
    if (trip.status === "active" && (u.driverId || u.truckId || u.trailerId)) {
      return res.status(400).json({ message: "Cannot change resources while active" });
    }

    const start = u.startDate ? new Date(u.startDate) : new Date(trip.startDate);
    const end = u.endDate ? new Date(u.endDate) : new Date(trip.endDate);

    // Validate date range
    if ((u.startDate || u.endDate) && end <= start)
      return res.status(400).json({ message: "Invalid date range" });

    // Check for resource conflicts
    if (u.startDate || u.endDate || u.driverId || u.truckId || u.trailerId) {
      const conflict = await Trip.findOne({
        _id: { $ne: id },
        status: { $ne: "canceled" },
        startDate: { $lt: end },
        endDate: { $gt: start },
        $or: [
          { driverId: u.driverId ?? trip.driverId },
          { truckId: u.truckId ?? trip.truckId },
          { trailerId: u.trailerId ?? trip.trailerId }
        ]
      });

      if (conflict)
        return res.status(409).json({ message: "Resource already booked" });
    }

    // Activate trip only if current datetime is within start & end
    if (u.status === "active") {
      const now = new Date();
      if (now < start || now > end) {
        return res.status(400).json({ message: "Invalid activation time" });
      }

      await Vehicle.updateMany(
        { _id: { $in: [trip.truckId, trip.trailerId] } },
        { status: "active" }
      );
    }

    // Reset vehicles to available if trip completed or canceled
    if (trip.status === "active" && ["done", "canceled"].includes(u.status)) {
      await Vehicle.updateMany(
        { _id: { $in: [trip.truckId, trip.trailerId] } },
        { status: "available" }
      );
    }

    // Update trip with new data
    Object.assign(trip, u);
    await trip.save();

    res.json({ status: "updated successfully", data: trip });

  } catch (err) {
    console.error("Update Trip Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};




export default GenericController(tripService);
