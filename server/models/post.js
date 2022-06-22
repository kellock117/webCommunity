const { model, Schema } = require("mongoose");
const commentSchema = require("./comment.js");

const postSchema = new Schema({
  title: String,
  userID: String,
  content: String,
  time: String,
  likes: [String],
  comments: commentSchema.schema,
});

module.exports = model("post", postSchema);
