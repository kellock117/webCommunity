const { model, Schema } = require("mongoose");

const HistorySchema = new Schema({
  userName: String,
  history: { type: [{type: String, userName: String}], default: null },
});

module.exports = model("history", HistorySchema);
