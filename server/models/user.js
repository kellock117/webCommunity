const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  id: String,
  password: String,
});

module.exports = model("user", userSchema);
