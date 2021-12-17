const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  pfp: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "offline",
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
