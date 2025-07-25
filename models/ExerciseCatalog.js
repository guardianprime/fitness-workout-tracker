// models/ExerciseCatalog.js
const mongoose = require("mongoose");

const ExerciseCatalogSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  category: { type: String, enum: ["cardio", "strength", "flexibility"] },
  muscleGroup: { type: String }, // e.g., Chest, Back, Legs
});

module.exports = mongoose.model("ExerciseCatalog", ExerciseCatalogSchema);
