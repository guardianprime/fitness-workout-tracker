const express = require("express");
const authRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

authRouter.get("/", (req, res) => {
  res.send("Authentication routes");
});

authRouter.post("/login", loginUser);

authRouter.get("/login", (req, res) => {
  res.send("Login endpoint");
});

authRouter.post("/register", registerUser);

authRouter.get("/register", (req, res) => {
  res.send("Register endpoint");
});

module.exports = authRouter;
