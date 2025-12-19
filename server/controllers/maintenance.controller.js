
import maintenanceService from "../services/maintenance.service.js";
import { GenericController } from "./generic/generic.controller.js";
import Models from "../models/index.js";
import Vehicle from "../models/Vehicle.js";
import Trip from "../models/Trip.js";
import Maintenance from "../models/Maintenance.js";


export const createMaintenance = async (req, res) => {
  try {
    const {
      maintenanceRuleId,
      vehicleId,
      targetType,
      component,
      description,
      cost,
      date,
      kmAtMaintenance
    } = req.body;

    const maintenance = await Models.Maintenance.create({
      maintenanceRuleId,
      vehicleId,
      targetType,
      component,
      description,
      cost,
      date,
      kmAtMaintenance,
      status: "pending"
    });


    await Models.Vehicle.findByIdAndUpdate(vehicleId, {
      status: "maintenance"
    });

    res.status(201).json({
      message: "Maintenance created",
      data: maintenance
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const maintenance = await Maintenance.findById(id);
    if (!maintenance)
      return res.status(404).json({ message: "Maintenance not found" });

    maintenance.status = status;
    await maintenance.save();

    const remaining = await Maintenance.countDocuments({
      vehicleId: maintenance.vehicleId,
      status: { $in: ["pending", "in_progress"] }
    });

    if (remaining > 0) {
      await Vehicle.findByIdAndUpdate(maintenance.vehicleId, {
        status: "maintenance"
      });
    } else {
      const activeTrip = await Trip.findOne({
        status: "active",
        $or: [
          { truckId: maintenance.vehicleId },
          { trailerId: maintenance.vehicleId }
        ]
      });

      if (activeTrip) {
        await Vehicle.findByIdAndUpdate(maintenance.vehicleId, {
          status: "active"
        });
      } else {
        await Vehicle.findByIdAndUpdate(maintenance.vehicleId, {
          status: "inactive"
        });
      }
    }

    res.json({
      message: "Maintenance updated successfully",
      data: maintenance
    });

  } catch (err) {
    console.error("updateMaintenance error:", err);
    res.status(500).json({ message: err.message });
  }
};



export default GenericController(maintenanceService);
