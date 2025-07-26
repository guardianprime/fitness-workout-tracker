function loginUser(req, res) {
  const { username, password } = req.body;

  // Here you would typically check the credentials against a database
  if (username === "admin" && password === "password") {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
}

function registerUser(req, res) {
  const { username, email, password } = req.body;

  // Here you would typically save the user to a database
  if (username && email && password) {
    res.status(201).send("User registered successfully");
  } else {
    res.status(400).send("Missing required fields");
  }
}

module.exports = {
  loginUser,
  registerUser,
};
