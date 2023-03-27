const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
const usersRouter = require('./src/routes/user');
//const postsRouter = require('./routes/posts');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa a la base de datos"))
  .catch((error) => console.log(error));

app.use('/users', usersRouter);
//app.use('/posts', postsRouter);

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
