const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer();

const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(upload.none());

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
        res
          .cookie("token", token, {
            secure: true,
            path: "/",
            sameSite: "none",
          })
          .json({
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
      return res.status(200).json(userInfo);
    });
  } else {
    res.status(401).json({ message: "not auth" });
  }
});

app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      secure: true,
      path: "/",
      sameSite: "none",
    })
    .json("logout successful");
});

// CRUD Operation

// CREATE
app.post("/upload", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ messgae: "user not auth." });
      }
      const { title, content, imageUrl } = req.body;
      const postDoc = await Post.create({
        title,
        imageUrl,
        content,
        author: info.user_id,
      });
      res.status(200).json(postDoc);
    });
  } else {
    res.status(401).json({ messgae: "user not auth." });
  }
});

// READ => READ ALL
app.get("/posts", async (req, res) => {
  const postDocs = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.status(200).json(postDocs);
});

// READ => READ ONE
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.status(200).json(postDoc);
});

// UPDATE => GET OLD DATA
app.get("/edit-post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.status(200).json(postDoc);
});

// UPDATE => REAL UPDATE
app.put("/edit-post", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ messgae: "user not auth." });
      }
      const { title, content, imageUrl, post__id, author_id } = req.body;
      const postDoc = await Post.findById(post__id);
      if (author_id === info.user_id) {
        postDoc.title = title;
        postDoc.content = content;
        postDoc.imageUrl = imageUrl;
        postDoc.save();
      }
      return res.status(200).json(postDoc);
    });
  } else {
    res.status(401).json({ messgae: "user not auth." });
  }
});

app.delete("/post-delete/:id", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ messgae: "user not auth." });
      }
      const { id } = req.params;
      const { author_id } = req.body;

      if (author_id === info.user_id) {
        await Post.findByIdAndRemove(id);
      }
      res.status(200).json({ message: "Post Deleted" });
    });
  } else {
    res.status(401).json({ messgae: "user not auth." });
  }
});

app.listen(8080);
