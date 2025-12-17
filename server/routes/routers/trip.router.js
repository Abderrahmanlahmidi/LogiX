import express from "express";
import tripController, {createTrip, getTripsByDriver, updateTrip} from "../../controllers/trip.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";


const router = express.Router();

// CRUD Routes
router.get("/trip/:id", authMiddleware, tripController.getOne);
router.get("/driver-trips/:driverId",
    authMiddleware,
    getTripsByDriver
    );

router.get("/trips", (req, res, next) => {
    req.options = {
        populate: ["driverId", "truckId", "trailerId"],
    };
    next();
}, authMiddleware,tripController.getAll);
router.post("/create-trip", createTrip);
router.delete("/delete-trip/:id", authMiddleware, tripController.delete);
router.put("/update-trip/:id", updateTrip);

export default router;
