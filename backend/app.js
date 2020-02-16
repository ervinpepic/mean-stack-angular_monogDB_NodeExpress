const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mong = require("mongoose");

const postRoutes = require("./routes/posts");

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

app.use("/api/posts", postRoutes);
module.exports = app;
