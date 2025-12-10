import express from "express";
import tripController from "../../controllers/trip.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// CRUD Routes
router.get("/trip/:id", authMiddleware, tripController.getOne);
router.get("/trips", authMiddleware, tripController.getAll);
router.post("/create-trip", authMiddleware, tripController.create);
router.delete("/delete-trip/:id", authMiddleware, tripController.delete);
router.put("/update-trip/:id", authMiddleware, tripController.update);

export default router;
