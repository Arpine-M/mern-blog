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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));