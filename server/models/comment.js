const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  content: String,
  userName: String,
  time: String,
  likes: { type: [String], default: null },
});

module.exports = model("comment", CommentSchema);
