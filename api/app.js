const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

const User = require("./models/User");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

const salt = bcrypt.genSaltSync(10);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const success = bcrypt.compareSync(password, userDoc.password);

  if (success) {
    jwt.sign(
      { username, user_id: userDoc._id },
      process.env.JWT_KEY,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          username,
          user_id: userDoc._id,
        });
      }
    );
  } else {
    res.status(400).json("Wrong user credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, {}, (err, userInfo) => {
      if (err) throw err;
      res.json(userInfo);
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logout successful");
});

app.listen(8080);
