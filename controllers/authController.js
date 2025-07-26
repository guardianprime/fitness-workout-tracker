const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

async function loginUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function registerUser(req, res) {
  const { username, password } = req.body;
  try {
    User.register(new User({ username }), password, (err, user) => {
      if (err) {
        let errorMsg = "Error registering user.";
        if (err.name === "UserExistsError") {
          errorMsg = "A user with that username already exists.";
        } else if (err.name === "MissingUsernameError") {
          errorMsg = "No username was given.";
        } else if (err.name === "MissingPasswordError") {
          errorMsg = "No password was given.";
        }
        return res.status(400).json({ error: errorMsg });
      }
      // Generate JWT after successful registration
      const token = jwt.sign({ username: user.username }, SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User registered successfully", token });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  loginUser,
  registerUser,
};
