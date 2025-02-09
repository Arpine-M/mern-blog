const express = require("express");
const postController = require("../../controllers/posts/postController");
const multer = require("multer");
const postRouter = express.Router();
const storage = require("../../utils/fileupload");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const upload = multer({storage});


postRouter.post("/posts/create", isAuthenticated, upload.single("image"), postController.createPost);

postRouter.get('/posts', postController.fetchAllPosts);


postRouter.put('/posts/:postId', isAuthenticated, postController.update);


postRouter.get('/posts/:postId', postController.getPost);


postRouter.delete('/posts/:postId', isAuthenticated, postController.delete); 

module.exports = postRouter;