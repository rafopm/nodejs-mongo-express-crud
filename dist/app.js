"use strict";

var express = require("express");
var mongoose = require("mongoose");
require("dotenv").config();
var userRoute = require("./routes/user");

// settings
var app = express();
//const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);

// routes
app.get("/", function (req, res) {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose.connect(process.env.MONGODB_URI).then(function () {
  return console.log("Connected to MongoDB Atlas");
})["catch"](function (error) {
  return console.error(error);
});

// server listening
app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port 3000!');
});
"use strict";

var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('User', userSchema);
"use strict";

var express = require("express");
var userSchema = require("../models/userModel");
var router = express.Router();

// create user
router.post("/users", function (req, res) {
  var user = userSchema(req.body);
  user.save().then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
});

// get all users
router.get("/users", function (req, res) {
  userSchema.find().then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
});

// get a user
router.get("/users/:id", function (req, res) {
  var id = req.params.id;
  userSchema.findById(id).then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
});

// delete a user
router["delete"]("/users/:id", function (req, res) {
  var id = req.params.id;
  userSchema.deleteOne({
    _id: id
  }).then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
});

// update a user
router.put("/users/:id", function (req, res) {
  var id = req.params.id;
  var _req$body = req.body,
    name = _req$body.name,
    age = _req$body.age,
    email = _req$body.email;
  userSchema.updateOne({
    _id: id
  }, {
    $set: {
      name: name,
      age: age,
      email: email
    }
  }).then(function (data) {
    return res.json(data);
  })["catch"](function (error) {
    return res.json({
      message: error
    });
  });
});
module.exports = router;