import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
