const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  postID: String,
  content: String,
  userName: String,
  time: String,
  likes: { type: [String], default: null },
});

module.exports = model("comment", CommentSchema);
