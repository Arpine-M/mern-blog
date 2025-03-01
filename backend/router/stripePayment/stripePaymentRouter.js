const express = require("express");
const stripePaymentRouter = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const stripePaymentController = require("../../controllers/stripePayment/stripePaymentController");
const checkUserPlan = require("../../middlewares/checkUserPlan");

stripePaymentRouter.post("/checkout", isAuthenticated, stripePaymentController.payment);

stripePaymentRouter.get("/verify/:paymentId",  stripePaymentController.verify);
stripePaymentRouter.get("/free-plan", isAuthenticated, stripePaymentController.free);




module.exports = stripePaymentRouter;