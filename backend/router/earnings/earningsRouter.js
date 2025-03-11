const express = require("express");
const earningsRouter = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const earningsController = require("../../controllers/earnings/earningsController");



earningsRouter.get('/', earningsController.fetchAllEarnings);
earningsRouter.get('/my-earnings', isAuthenticated, earningsController.getUserEarnings);



module.exports = earningsRouter;