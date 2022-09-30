const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  postID: String,
  content: String,
  userID: String,
  time: String,
  likes: { type: [String], default: null },
});

module.exports = model("comment", CommentSchema);
