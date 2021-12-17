const mongoose = require("mongoose");
const userModel = "./user.js";
const msgSchema = mongoose.Schema({
  chatUsers: [String],
  messages: [{ message: String, from: String }],
});

const messages = mongoose.model("messages", msgSchema);

module.exports = messages;
