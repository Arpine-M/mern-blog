require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./utils/connectDB");
const postRouter = require("./router/post/postsRouter");
const usersRouter = require("./router/user/usersRouter");
const cron = require("node-cron");
const passport = require("./utils/passport-config");
const cookie = require('cookie-parser')
const categoriesRouter = require("./router/category/categoriesRouter");
const planRouter = require("./router/plan/planRouter");
const stripePaymentRouter = require("./router/stripePayment/stripePaymentRouter");
const calculateEarnings = require("./utils/calculateEarnings");
const earningsRouter = require("./router/earnings/earningsRouter");
const notificationRouter = require("./router/notification/notificationRouter");
const commentRouter = require("./router/comments/commentRouter");

connectDB();

cron.schedule("59 23 * * *", async() =>{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if(today.getMonth() !== tomorrow.getMonth()) {
        calculateEarnings();

    }
}, 

 {
    scheduled: true,
    timezone:'America/New_York',
 }
);

const app = express();

const PORT = 5000;

app.use(express.json());
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(cookie())

app.use('/api/v1', postRouter);
app.use('/api/v1/users', usersRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/plans", planRouter);
app.use("/api/v1/stripe", stripePaymentRouter);
app.use("/api/v1/stripe", earningsRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/comments", commentRouter);



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