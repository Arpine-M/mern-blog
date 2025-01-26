const Post = require("../../models/Post/Post");
const asyncHandler = require("express-async-handler");


const postController = {
    createPost: asyncHandler(async (req, res) => {
    
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
    
    }),

    fetchAllPosts: asyncHandler(async (req, res) => {
        
                const posts = await Post.find();
                res.json({
                    status: "success",
                    message: "Posts fetched successfully",
                    posts,
                });
    }),
    getPost: asyncHandler(async (req, res) => {
        
            const postId = req.params.postId;
            const postFound = await Post.findById(postId);
            res.json({
                status: "success",
                message: "Post fetched successfully",
                postFound,
            });   
       
    }),
    delete: asyncHandler(async (req, res) => {
    
        const postId = req.params.postId;
        const postFound = await Post.findByIdAndDelete(postId);
        res.json({
            status: "success",
            message: "Post deleted successfully",
            
        });
    
    }),
    update: asyncHandler(async (req, res) => {
    
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
}


module.exports = postController