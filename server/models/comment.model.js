import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  userName: String,
  time: String,
  likes: { type: [String], default: null },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
