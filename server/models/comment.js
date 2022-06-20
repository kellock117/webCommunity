const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  content: String,
  userID: String,
  time: String,
  likes: Number,
});

module.exports = model("comment", commentSchema);
