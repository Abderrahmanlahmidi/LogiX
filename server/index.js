import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routers from "./routes/router.js";
import {errorHandler} from "./middlewares/error.handler.middleware.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// ------------------ Cors ------------------
app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET", "POST", "DELETE", "PUT"],
        credentials:true
    })
)


// ------------------ MongoDB ------------------
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("📡 Connected to MongoDB");
});


mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ------------------ Routers ------------------
for (const r of routers) {
    app.use(r.path, r.route);
}

// ------------------ Error Handler ------------------
app.use(errorHandler);

// ------------------ Start Server ------------------
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running at → (http://localhost:${PORT})`);
});

