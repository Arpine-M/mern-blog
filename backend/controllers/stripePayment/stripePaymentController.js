const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Plan = require("../../models/Plan/Plan");
const User = require("../../models/User/User");

const stripePaymentController = {
    payment: asyncHandler(async (req, res) => {
        const {subscriptionPlanId} = req.body;
        if(!mongoose.isValidObjectId(subscriptionPlanId)){
            return res.json({message:"Invalid subscription plan"});
        }

        const plan = await Plan.findById(subscriptionPlanId);
        if(!plan){
            return res.json({message:"Plan not found"});
        }

        const user = req.user;
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                amount: plan.price * 100,
                currency: "usd",
                metadata: {
                    userId: user?.toString(),
                    subscriptionPlanId
                },
            });
            res.json({
                clientSecret: paymentIntent.client_secret,
                subscriptionPlanId,
                paymentIntent,
            });
        } catch(error){
            res.json({error})

        }
    }),

    verify: asyncHandler(async (req, res) => {

        const {paymentId} =req.params;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

        if(paymentIntent.status !== "success"){
            const metadata = paymentIntent.metadata;
            const subscriptionPlanId = metadata.subscriptionPlanId;
            const userId = metadata.userId;

            const userFound = await User.findById(userId);

            if(!userFound){
                return res.json({message:"User not found"});
            }

            const amount = paymentIntent?.amount / 100;
            const currency = paymentIntent?.currency;

            const createPayment = await Payment.create({
                user: userId,
                subscriptionPlan: subscriptionPlanId,
                status: "success",
                amount,
                currency,
                reference: paymentId
            })

            if(newPayment){
                userFound.hasSelectedPlan = true;
                userFound.plan = subscriptionPlanId;

                await userFound.save();
            }

            res.json({
                status: true,
                message: "Payment verified successfully",
                userFound
            });
        }    
   }),

   free: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    if(!user){
        throw new Error("User not found");

    } 
    user.hasSelectedPlan = true;
    await user.save();

    res.json({
        status: true,
        message: "Payment verified successfully",
        
    })

   })
}

module.exports = stripePaymentController