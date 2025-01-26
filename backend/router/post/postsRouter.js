const express = require("express");
const Post = require("../../models/Post/Post");
const asyncHandler = require("express-async-handler");
const postController = require("../../controllers/posts/postController");

const postRouter = express.Router();


postRouter.post("/posts/create", postController.createPost);

postRouter.get('/posts', postController.fetchAllPosts);


postRouter.put('/posts/:postId', postController.update);


postRouter.get('/posts/:postId', postController.getPost);


postRouter.delete('/posts/:postId', postController.delete); 

module.exports = postRouter;