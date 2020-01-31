const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mong = require("mongoose");

const Post = require("./models/post");

app.use(bodyParser.json());

mong
  .connect(
    "mongodb+srv://ervinpepic:93FOADJsOaz4jDfj@cluster0-sesk1.mongodb.net/node-angular?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use((requ, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (requ, resp, next) => {
  const post = new Post({
    title: requ.body.title,
    content: requ.body.content
  });
  post.save().then(createdPost => {
    resp.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (requ, resp, next) => {
  Post.find().then(fajlovi => {
    resp.status(200).json({
      message: "Posts fetched done!",
      posts: fajlovi
    });
  });
});

app.put("/api/posts/:id", (requ, resp, next) => {
  const post = new Post({
    _id: requ.body.id,
    title: requ.body.title,
    content: requ.body.content
  });
  Post.updateOne({ _id: requ.params.id }, post).then(rezultat => {
    console.log(rezultat);
    resp.status(200).json({message: 'Updated successfully'});
  });
});

app.get("/api/posts/:id", (requ, resp, next) => {
  Post.findById(requ.params.id).then(post => {
    if (post) {
      resp.status(200).json(post);
    } else {
      resp.status(404).json({message: 'Post not found'});
    }
  })
});

app.delete("/api/posts/:id", (requ, resp, next) => {
  Post.deleteOne({ _id: requ.params.id }).then(rezultat => {
    console.log(rezultat);
    resp.status(200).json({ message: 'Post deleted successfully' });
  });

});

module.exports = app;
