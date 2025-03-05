const Earnings = require("../models/Earning/Earnings");
const Post = require("../models/Post/Post");

const RATE_PER_VIEW = 0.01;
const calculateEarnings = async () => {
    const currentDate = new Date();
    const posts = await Post.find();

    for(const post of posts) {
        const nextViewsCount = post.viewers.length - post.lastCalculatedViewsCount;
        const earningsAmount = nextViewsCount * RATE_PER_VIEW;
        post.thisMonthEarnings += earningsAmount;
        post.totalEarnings += earningsAmount;

        await Earnings.create({
            user: post.author,
            post: post._id,
            amount: earningsAmount,
            calculatedOn: currentDate
        });

        post.lastCalculatedViewsCount = post.viewers.length;
        post.nextEarningDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

        await post.save();
    }
}

module.exports = calculateEarnings