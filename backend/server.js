require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./utils/connectDB");
const postRouter = require("./router/post/postsRouter");
const usersRouter = require("./router/user/usersRouter");
const passport = require("./utils/passport-config");

connectDB();
const app = express();

const PORT = 5000;

app.use(express.json());
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use('/api/v1', postRouter);
app.use('/api/v1/users', usersRouter);

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