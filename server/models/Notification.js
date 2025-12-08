import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: String,
    description: String,
    isRead: { type: Boolean, default: false },
    type: { type: String, enum: ["warning", "info", "success"] }
}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
