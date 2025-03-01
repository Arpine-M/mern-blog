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
usersRouter.put("/unfollow/:unfollowId", isAuthenticated, userController.unFollowUser);
usersRouter.put("/account-verification-email", isAuthenticated, userController.verifyEmailAccount);
usersRouter.put("/verify-account/:verifyToken", isAuthenticated, userController.verifyEmailAcc);
usersRouter.post("/forgot-password", userController.forgotPassword);
usersRouter.post("/reset-password/:verifyToken", userController.resetPassword);

module.exports = usersRouter;