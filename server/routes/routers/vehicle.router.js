import express from "express";
import vehicleController from "../../controllers/vehicle.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const router = express.Router();


router.get("/vehicles", authMiddleware ,vehicleController.getAll);
router.get("/vehicle/:id", authMiddleware ,vehicleController.getOne);
router.post("/create-vehicle", authMiddleware ,vehicleController.create);
router.delete("/delete-vehicle/:id", authMiddleware ,vehicleController.delete);
router.put("/update-vehicle/:id", authMiddleware ,vehicleController.update);

export default router;
