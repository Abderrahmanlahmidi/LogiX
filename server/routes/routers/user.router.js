import express from "express";
import {
  register,
  login,
  updateProfile,
  logout,
    refreshToken
} from "../../controllers/user.controller.js";
import { userController } from "../../controllers/user.controller.js";
import { changePassword } from "../../controllers/user.controller.js";
import { uploadProfile } from "../../utils/uploadMiddleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {AuthService} from "../../services/user.service.js";

const router = express.Router();

// ------------------ AuthRoutes -------------------
router.post("/register", register);
router.post("/login", login);
router.post("/change-password/:id", authMiddleware, changePassword);
router.put("/update-profile/:id", authMiddleware ,uploadProfile, updateProfile);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// ------------------ CRUD --------------------------
router.get(
  "/user/:id",
  (req, res, next) => {
    req.options = {
      populate: ["roleId"],
      select: "-password",
    };
    next();
  },
    authMiddleware,
  userController.getOne
);

router.get("/users", (req, res, next) => {
    req.options = {
        populate: ["roleId"],
        select: "-password",
    };
    next();
} ,authMiddleware, userController.getAll);
router.put("/update-user/:id", authMiddleware, userController.update);

export default router;
