const express = require("express");
const userController = require("../../controllers/users/userController");
const usersRouter = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");

usersRouter.post("/register", userController.register);
usersRouter.post("/login", userController.login);
usersRouter.get("/auth/google", userController.googleAuth);
usersRouter.get("/auth/google/callback", userController.googleAuthCallback);
usersRouter.get("/checkAuthenticated", userController.checkAuthenticated);
usersRouter.post("/logout", userController.logout);
usersRouter.get("/profile", isAuthenticated, userController.profile);

module.exports = usersRouter;