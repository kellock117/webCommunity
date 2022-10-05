const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  title: String,
  userName: String,
  content: String,
  time: String,
  likes: { type: [String], default: null },
});

module.exports = model("post", PostSchema);
