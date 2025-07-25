// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }, // hashed!
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
