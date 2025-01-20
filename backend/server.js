require("dotenv").config();
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const express = require("express");
const Post = require("./models/Post/Post");
const connectDB = require("./utils/connectDB");

connectDB();
const app = express();

const PORT = 5000;

app.use(express.json());
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions));

app.post('/api/v1/posts/create', asyncHandler(async (req, res) => {
    
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
    
})
)

app.get('/api/v1/posts', asyncHandler(async (req, res) => {
    
            const posts = await Post.find();
            res.json({
                status: "success",
                message: "Posts fetched successfully",
                posts,
            });
        })
)

app.put('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    
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

app.get('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        res.json({
            status: "success",
            message: "Post fetched successfully",
            postFound,
        });

   
})
)

app.delete('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
    
    const postId = req.params.postId;
    const postFound = await Post.findByIdAndDelete(postId);
    res.json({
        status: "success",
        message: "Post deleted successfully",
        
    });

}))

app.use((req, res, next) => {    
    res.status(404).json({
        message: "Route not found"
    });
})

app.use((err, req, res, next) => {
    const message = err.message;
    const stack = err.stack;
    res.status(500).json({
        message,
        stack
    });
})
    

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));