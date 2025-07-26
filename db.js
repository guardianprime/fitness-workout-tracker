// db.js
const mongoose = require("mongoose");
require("dotenv").config();

const CONNECTION_URL = process.env.MONGO_URI;

function connectToMongoDB() {
  mongoose.connect(CONNECTION_URL);

  mongoose.connection.on("connected", () => {
    console.log("✅ Successfully connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });
}

module.exports = { connectToMongoDB };
