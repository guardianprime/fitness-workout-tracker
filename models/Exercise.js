// models/Exercise.js
const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
  name: { type: String, required: true }, // e.g., Bench Press
  muscleGroup: { type: String }, // e.g., Chest, optional
  sets: [
    {
      reps: { type: Number },
      weight: { type: Number }, // in kg or lbs
      distance: { type: Number }, // for cardio, in meters/km
      duration: { type: Number }, // for cardio, in seconds/minutes
      notes: { type: String },
    },
  ],
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
