const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

//routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

//mongodb connection
mongoose.connect(MONGODB_URI).then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err))

app.listen(port, () => console.log("server listening on port ", port));
