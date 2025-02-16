const express = require("express");
const planRouter = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");
const planController = require("../../controllers/plan/planController");


planRouter.post("/create", isAuthenticated, planController.createPlan);

planRouter.get('/', planController.lists);


planRouter.put('/:planId', isAuthenticated, planController.update);


planRouter.get('/:planId', planController.getPlan);


planRouter.delete('/:planId', isAuthenticated, planController.delete); 

module.exports = planRouter;