import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: [64, "max length: 64"] },
  userName: { type: String, required: true },
  content: {
    type: String,
    required: true,
    maxLength: [512, "max length: 512"],
  },
  time: { type: Date, default: Date.now },
  likes: { type: [String], default: null },
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
