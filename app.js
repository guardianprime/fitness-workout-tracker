const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./db");
const workoutRouter = require("./routes/workout");
const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.send("Hello, welcome to the fitness tracker API!");
});

app.use("/api/auth", authRouter);
app.use("/api/workouts", workoutRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
