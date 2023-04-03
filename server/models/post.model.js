import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  userName: String,
  content: String,
  time: String,
  likes: { type: [String], default: null },
  comments: [{ type: mongoose.Types.ObjectId, ref: "comment", default: null }],
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
