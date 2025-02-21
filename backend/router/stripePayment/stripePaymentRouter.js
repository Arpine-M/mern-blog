const express = require("express");
const stripePaymentRouter = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const stripePaymentController = require("../../controllers/stripePayment/stripePaymentController");

stripePaymentRouter.post("/checkout", isAuthenticated, stripePaymentController.payment);

stripePaymentRouter.get("/verify/:paymentId", stripePaymentController.verify);




module.exports = stripePaymentRouter;