import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  password: { type: String, required: true },
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "notification" },
  ],
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
