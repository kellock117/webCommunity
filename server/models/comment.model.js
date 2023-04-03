import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  userName: String,
  time: String,
  likes: { type: [String], default: null },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
