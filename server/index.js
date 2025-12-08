import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const app = express();


app.get("/", (req, res) => {
    res.send('Server is running...');
})

// ------------------ MongoDB ------------------
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("-Connected to MongoDB");
});

mongoose.connection.on("error", console.log);

// ------------------ Routes ------------------


// ------------------ Start Server ------------------
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`-Server running on http://localhost:${PORT} 🚀`);
})