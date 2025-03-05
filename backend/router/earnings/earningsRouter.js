const express = require("express");
const earningsRouter = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const earningsController = require("../../controllers/earnings/earningsController");



earningsRouter.get('/', earningsController.fetchAllEarnings);



module.exports = earningsRouter;