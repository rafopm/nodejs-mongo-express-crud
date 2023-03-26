const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./src/routes/user");
// settings
const app = express();
//const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on port 3000!');
});