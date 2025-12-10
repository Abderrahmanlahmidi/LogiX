import express from "express";
import roleController from "../../controllers/role.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// ------------------ CRUD -------------------
router.get("/role/:id", authMiddleware, roleController.getOne);
router.get("/roles", authMiddleware, roleController.getAll);
router.post("/create-role", authMiddleware, roleController.create);
router.delete("/delete-role/:id", authMiddleware, roleController.delete);
router.put("/update-role/:id", authMiddleware, roleController.update);

export default router;
