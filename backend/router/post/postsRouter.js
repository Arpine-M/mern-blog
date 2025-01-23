const express = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const postRouter = express.Router();


postRouter.post("/api/v1/posts/create", asyncHandler(async (req, res) => {
    
        const {title, description} = req.body;
        const postFound = await Post.findOne({title});
        if(postFound){
            throw new Error("Post already exists");
        }
        const postCreated = await Post.create({title, description});
        res.json({
            status: "success",
            message: "Post created successfully",
            postCreated,
        });
    
}))

postRouter.get('/api/v1/posts', asyncHandler(async (req, res) => {
    
            const posts = await Post.find();
            res.json({
                status: "success",
                message: "Posts fetched successfully",
                posts,
            });
        })
)

postRouter.put('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        if(!postFound){
            throw new Error("Post not found");
    }
    const postUpdated = await Post.findByIdAndUpdate(postId, {title: req.body.title, description: req.body.description}, 
        {new: true}
    );
    res.json({
        
        status: "Post updated successfully",
        postUpdated,
    });
 })    
)

postRouter.get('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        res.json({
            status: "success",
            message: "Post fetched successfully",
            postFound,
        });

   
})
)

postRouter.delete('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    
    const postId = req.params.postId;
    const postFound = await Post.findByIdAndDelete(postId);
    res.json({
        status: "success",
        message: "Post deleted successfully",
        
    });

}))

module.exports = postRouter;