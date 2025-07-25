const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./db");
const app = express();
const port = process.env.PORT || 3000;

connectToMongoDB();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
