import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  content: {
    type: String,
    required: true,
    maxLength: [512, "max length: 512"],
  },
  time: { type: Date, default: Date.now },
  likes: { type: [String], default: null },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
