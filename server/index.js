import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routers from "./routes/router.js";
import {errorHandler} from "./middlewares/error.handler.middleware.js";

dotenv.config();
const app = express();
app.use(express.json());

// ------------------ MongoDB ------------------
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("+Connected to MongoDB");
});

mongoose.connection.on("error", console.log);

// ------------------ Routers ------------------
for (const r of routers) {
    app.use(r.path, r.route);
}

// ------------------ Start Server ------------------
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`+Server running on http://localhost:${PORT} 🚀`);
});

// ------------------ Error Handler ------------------
app.use(errorHandler);
