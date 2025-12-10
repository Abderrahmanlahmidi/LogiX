import express from "express";
import tireController from "../../controllers/tire.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// CRUD Routes
router.get("/tire/:id", authMiddleware, tireController.getOne);
router.get("/tires", authMiddleware, tireController.getAll);
router.post("/create-tire", authMiddleware, tireController.create);
router.delete("/delete-tire/:id", authMiddleware, tireController.delete);
router.put("/update-tire/:id", authMiddleware, tireController.update);

export default router;
