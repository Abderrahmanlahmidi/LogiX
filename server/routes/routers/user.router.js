import express from 'express';
import {register, login} from "../../controllers/user.controller.js";
import {userController} from "../../controllers/user.controller.js";
import {changePassword} from "../../controllers/user.controller.js";

const router = express.Router();

// ------------------ AuthRoutes -------------------
router.post("/register", register);
router.post("/login", login);
router.post("/change-password/:id", changePassword);

// ------------------ CRUD --------------------------
router.get("/user/:id", (req, res, next) => {
    req.options = {
        populate: ["roleId"],
        select: "-password",
    };
    next();
} ,userController.getOne);

router.get("/users", userController.getAll);
router.put("/update-user/:id", userController.update);




export default router;