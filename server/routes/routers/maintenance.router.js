import express from "express";
import maintenanceController, { createMaintenance, updateMaintenance } from "../../controllers/maintenance.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/maintenance/:id", authMiddleware, maintenanceController.getOne);

router.get("/maintenances", 
  (req, res, next) => {
    req.options = {
      populate: ["vehicleId"],
    };
    next();
  } 
  ,maintenanceController.getAll);
router.post(
  "/create-maintenance",
  // authMiddleware,
  createMaintenance
);
router.put(
  "/update-maintenance/:id",
  authMiddleware,
  updateMaintenance
);
router.delete(
  "/delete-maintenance/:id",
  authMiddleware,
  maintenanceController.delete
);

export default router;
