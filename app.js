const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const workoutRouter = require("./routes/workout");
const authRouter = require("./routes/auth");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to MySQL successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to MySQL:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.send("Hello, welcome to the fitness tracker API!");
});

app.use("/api/auth", authRouter);
app.use(
  "/api/workouts",
  passport.authenticate("jwt", { session: false }),
  workoutRouter
);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
