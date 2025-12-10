import express from "express";
import maintenanceRuleController from "../../controllers/maintenance-rule.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// CRUD Routes
router.get(
  "/maintenance-rule/:id",
  authMiddleware,
  maintenanceRuleController.getOne
);
router.get(
  "/maintenance-rules",
  authMiddleware,
  maintenanceRuleController.getAll
);
router.post(
  "/create-maintenance-rule",
  authMiddleware,
  maintenanceRuleController.create
);
router.delete(
  "/delete-maintenance-rule/:id",
  authMiddleware,
  maintenanceRuleController.delete
);
router.put(
  "/update-maintenance-rule/:id",
  authMiddleware,
  maintenanceRuleController.update
);

export default router;
