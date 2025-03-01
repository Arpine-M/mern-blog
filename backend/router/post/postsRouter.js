const express = require("express");
const postController = require("../../controllers/posts/postController");
const multer = require("multer");
const postRouter = express.Router();
const storage = require("../../utils/fileupload");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const checkUserPlan = require("../../middlewares/checkUserPlan");
const optionalAuth = require("../../middlewares/optionalAuth");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const upload = multer({storage});


postRouter.post("/posts/create", isAuthenticated, checkUserPlan, isAccountVerified, upload.single("image"), postController.createPost);

postRouter.get('/posts', postController.fetchAllPosts);


postRouter.put('/posts/:postId', isAuthenticated, postController.update);


postRouter.get('/posts/:postId', optionalAuth, postController.getPost);


postRouter.delete('/posts/:postId', isAuthenticated, postController.delete); 

postRouter.put('/posts/likes/:postId', isAuthenticated, postController.like); 

postRouter.put('/posts/dislikes/:postId', isAuthenticated, postController.dislike); 

module.exports = postRouter;