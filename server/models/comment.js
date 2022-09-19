const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  content: String,
  userID: String,
  time: String,
  likes: [String],
});

module.exports = model("comment", commentSchema);
