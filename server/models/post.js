const { model, Schema } = require("mongoose");
const commentSchema = require("./comment.js");

const postSchema = new Schema({
  title: String,
  userID: String,
  content: String,
  time: String,
  likes: { type: [String], default: null },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "comment",
    default: null,
  },
});

module.exports = model("post", postSchema);
