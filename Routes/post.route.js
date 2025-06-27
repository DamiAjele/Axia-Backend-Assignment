const express = require("express");
const { createPost, updatePost, deletePost, getSinglePost, getUserPosts } = require("../Controller/post.controller");
const authentication = require("../Middlewares/auth.middleware");
const postRoute = express.Router();

postRoute.post("/posts", authentication, createPost);
postRoute.get("/single-post", authentication, getSinglePost);
postRoute.get("/posts", authentication, getUserPosts);
postRoute.put("/posts", authentication, updatePost);
postRoute.delete("/posts", authentication, deletePost);


module.exports = postRoute;
