const express = require("express");
const bodyParser = require("body-parser");

const app = express();



app.use(bodyParser.json());


app.use((requ, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (requ, resp, next) => {
  const post = requ.body;
  console.log(post);
  resp.status(201).json({
    message: "Post added successfully"
  });
});

app.get("/api/posts", (requ, resp, next) => {
  const posts = [
    {
      id: "1",
      title: "Ervin",
      content: "Pepic"
    },
    {
      id: "2",
      title: "Emel",
      content: "Pepic"
    },
    {
      id: "3",
      title: "Erna",
      content: "Pepic"
    }
  ];
  resp.status(200).json({
    message: "Posts fetched done!",
    posts: posts
  });
});

module.exports = app;
