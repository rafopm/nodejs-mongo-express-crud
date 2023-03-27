const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const usersRouter = require("./src/routes/user");
const productsRouter = require("./src/routes/product");

// settings
const app = express();
const port = 3000;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((error) => console.log(error));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
app.use("/users", usersRouter);
app.use('/products', productsRouter);

// server listening
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
