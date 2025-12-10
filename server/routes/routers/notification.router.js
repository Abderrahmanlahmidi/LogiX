import express from "express";
import notificationController from "../../controllers/notification.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// CRUD Routes
router.get("/notification/:id", authMiddleware, notificationController.getOne);
router.get("/notifications", authMiddleware, notificationController.getAll);
router.post(
  "/create-notification",
  authMiddleware,
  notificationController.create
);
router.delete(
  "/delete-notification/:id",
  authMiddleware,
  notificationController.delete
);
router.put(
  "/update-notification/:id",
  authMiddleware,
  notificationController.update
);

export default router;
