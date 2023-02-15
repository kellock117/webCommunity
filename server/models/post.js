const { mongoose } = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  userName: String,
  content: String,
  time: String,
  likes: { type: [String], default: null },
  comments: [{ type: mongoose.Types.ObjectId, ref: "comment", default: null }],
});

module.exports = mongoose.model("post", PostSchema);
