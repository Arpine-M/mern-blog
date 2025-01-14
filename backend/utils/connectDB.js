const mongoose = require("mongoose");

const connectDB = async () => {
    console.log(process.env);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected successfully");
    } catch (error) {
        console.log(`Error connecting to DB ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

// AUT0KzPWDVGULbsT
// malerischam
// url: mongodb+srv://malerischam:AUT0KzPWDVGULbsT@mern-blog-cluster.nmynq.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog-cluster