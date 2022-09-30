const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  title: String,
  userID: String,
  content: String,
  time: String,
  likes: { type: [String], default: null },
});

module.exports = model("post", PostSchema);
