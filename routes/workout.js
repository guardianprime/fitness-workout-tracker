const workoutRouter = require("express").Router();
const {
  getAllWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

workoutRouter.get("/", getAllWorkouts);

workoutRouter.post("/", createWorkout);

workoutRouter.put("/:id", updateWorkout);

workoutRouter.delete("/:id", deleteWorkout);

module.exports = workoutRouter;
