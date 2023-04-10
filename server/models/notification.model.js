import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  action: { type: String, required: true, enum: ["like", "comment"] },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  time: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const notificationModel = mongoose.model("notification", notificationSchema);

export default notificationModel;
