const express = require("express");
const postController = require("../../controllers/posts/postController");
const multer = require("multer");
const postRouter = express.Router();
const storage = require("../../utils/fileupload");

const upload = multer({storage});


postRouter.post("/posts/create", upload.single("image"), postController.createPost);

postRouter.get('/posts', postController.fetchAllPosts);


postRouter.put('/posts/:postId', postController.update);


postRouter.get('/posts/:postId', postController.getPost);


postRouter.delete('/posts/:postId', postController.delete); 

module.exports = postRouter;