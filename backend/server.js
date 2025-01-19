require("dotenv").config();
const cors = require("cors");
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

app.post('/api/v1/posts/create', async (req, res) => {
    try {
        const postData = req.body;
        const postCreated = await Post.create(postData);
        res.json({
            status: "success",
            message: "Post created successfully",
            postCreated,
        });
    }
    catch (error) {
        res.json(error);
        
    }
})

app.get('/api/v1/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({
            status: "success",
            message: "Posts fetched successfully",
            posts,
        });
    }
    catch (error) {
        res.json(error);
        
    }
})

app.put('/api/v1/posts/:postId', async (req, res) => {
        try {
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
    }
        catch (error) {
            throw new Error(error);  
        }
    })

app.get('/api/v1/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const postFound = await Post.findById(postId);
        res.json({
            status: "success",
            message: "Post fetched successfully",
            postFound,
        });

    } catch (error) {
        throw new Error(error);
        
    }
})

app.delete('/api/v1/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const postFound = await Post.findByIdAndDelete(postId);
        res.json({
            status: "success",
            message: "Post deleted successfully",
            
        });

    } catch (error) {
        throw new Error(error);
        
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));