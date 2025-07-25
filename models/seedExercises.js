// seedExercises.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ExerciseCatalog = require("./ExerciseCatalog");

const exercises = [
  {
    name: "Bench Press",
    description: "A strength exercise targeting the chest muscles.",
    category: "strength",
    muscleGroup: "Chest",
  },
  {
    name: "Squat",
    description: "A compound strength exercise targeting the legs and glutes.",
    category: "strength",
    muscleGroup: "Legs",
  },
  {
    name: "Deadlift",
    description: "A strength exercise targeting the back and legs.",
    category: "strength",
    muscleGroup: "Back",
  },
  {
    name: "Running",
    description: "A cardio exercise improving endurance and stamina.",
    category: "cardio",
    muscleGroup: "Legs",
  },
  {
    name: "Yoga",
    description: "A flexibility exercise for balance and muscle relaxation.",
    category: "flexibility",
    muscleGroup: "Full Body",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB Atlas");

    // Clear existing
    await ExerciseCatalog.deleteMany({});
    console.log("🗑️  Cleared existing exercises");

    // Insert new
    await ExerciseCatalog.insertMany(exercises);
    console.log("✅ Inserted new exercises");

    process.exit();
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
}

seed();
