const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const commentsController = require("../../controllers/comments/commentsController");

const commentRouter = express.Router();



commentRouter.post("/create", isAuthenticated, commentsController.create);

module.exports = commentRouter;