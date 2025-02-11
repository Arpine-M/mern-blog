const express = require("express");
const categoryController = require("../../controllers/categories/categoryController");
const categoriesRouter = express.Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");



categoriesRouter.post("/create", isAuthenticated, categoryController.createCategory);

categoriesRouter.get('/', categoryController.fetchAllCategories);


categoriesRouter.put('/:categoryId', isAuthenticated, categoryController.update);


categoriesRouter.get('/:categoryId', categoryController.getCategory);


categoriesRouter.delete('/:categoryId', isAuthenticated, categoryController.delete); 

module.exports = categoriesRouter;