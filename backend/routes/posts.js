const express = require("express");

const Post = require('../models/post');

const rutiranje = express.Router();

rutiranje.post("", (requ, resp, next) => {
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

rutiranje.get("", (requ, resp, next) => {
    Post.find().then(fajlovi => {
        resp.status(200).json({
            message: "Posts fetched done!",
            posts: fajlovi
        });
    });
});

rutiranje.put("/:id", (requ, resp, next) => {
    const post = new Post({
        _id: requ.body.id,
        title: requ.body.title,
        content: requ.body.content
    });
    Post.updateOne({ _id: requ.params.id }, post).then(rezultat => {
        console.log(rezultat);
        resp.status(200).json({ message: 'Updated successfully' });
    });
});

rutiranje.get("/:id", (requ, resp, next) => {
    Post.findById(requ.params.id).then(post => {
        if (post) {
            resp.status(200).json(post);
        } else {
            resp.status(404).json({ message: 'Post not found' });
        }
    })
});

rutiranje.delete("/:id", (requ, resp, next) => {
    Post.deleteOne({ _id: requ.params.id }).then(rezultat => {
        console.log(rezultat);
        resp.status(200).json({ message: 'Post deleted successfully' });
    });

});

module.exports = rutiranje;