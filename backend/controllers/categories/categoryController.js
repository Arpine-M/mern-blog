const Post = require("../../models/Post/Post");
const asyncHandler = require("express-async-handler");
const Category = require("../../models/Category/Category");

const categoryController = {
    createCategory: asyncHandler(async (req, res) => {
    
        const {categoryName, description} = req.body;
        const categoryFound = await Category.findOne({categoryName, description});
        if(categoryFound){
            throw new Error("Category already exists");
        }
        const categoryCreated = await Category.create({categoryName, author:req.user});
        
        res.json({
            status: "success",
            message: "Category created successfully",
            categoryCreated,
        });
    
    }),

    fetchAllCategories: asyncHandler(async (req, res) => {
        
                const categories = await Category.find();
                res.json({
                    status: "success",
                    message: "Category fetched successfully",
                    categories,
                });
    }),
    getCategory: asyncHandler(async (req, res) => {
        
            const categoryId = req.params.categoryId;
            const categoryFound = await Category.findById(categoryId);
            res.json({
                status: "success",
                message: "Post fetched successfully",
                postFound,
            });   
       
    }),
    delete: asyncHandler(async (req, res) => {
    
        const categoryId = req.params.categoryId;
        await Category.findByIdAndDelete(categoryId);
        res.json({
            status: "success",
            message: "Category deleted successfully",
            
        });
    
    }),
    update: asyncHandler(async (req, res) => {
    
        const categoryId = req.params.categoryId;
        const categoryFound = await Category.findById(categoryId);
        if(!categoryFound){
            throw new Error("Category not found");
    }
    const categoryUpdated = await Category.findByIdAndUpdate(categoryId, {categoryName: req.body.categoryName, description:req.body.description}, 
        {new: true}
    );
    res.json({
        
        status: "Category updated successfully",
        categoryUpdated,
    });
    })    
}


module.exports = categoryController