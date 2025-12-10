import express from "express";
import maintenanceController from "../../controllers/maintenance.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// CRUD Routes
router.get("/maintenance/:id", authMiddleware, maintenanceController.getOne);
router.get("/maintenances", authMiddleware, maintenanceController.getAll);
router.post(
  "/create-maintenance",
  authMiddleware,
  maintenanceController.create
);
router.delete(
  "/delete-maintenance/:id",
  authMiddleware,
  maintenanceController.delete
);
router.put(
  "/update-maintenance/:id",
  authMiddleware,
  maintenanceController.update
);

export default router;
