const asyncHandler = require("express-async-handler");
const Plan = require("../../models/Plan/Plan");

const planController = {
    createPlan: asyncHandler(async (req, res) => {
    
        const {planName, features, price} = req.body;
        const planFound = await Plan.findOne({planName});
        if(planFound){
            throw new Error("Plan already exists");
        }

        const planCount = await Plan.countDocuments();
        if (planCount >= 2) {
            throw new Error("You can not add more than 2 plans");
        }
        const PlanCreated = await Plan.create({
            planName, 
            features,
            price,
            user: req.user
        });
        
        res.json({
            status: "success",
            message: "Plan created successfully",
            PlanCreated,
        });
    
    }),

    lists: asyncHandler(async (req, res) => {
        
                const plans = await Plan.find();
                res.json({
                    status: "success",
                    message: "Plans fetched successfully",
                    plans,
                });
    }),
    getPlan: asyncHandler(async (req, res) => {
        
            const planId = req.params.categoryId;
            const planFound = await Plan.findById(planId);
            res.json({
                status: "success",
                message: "Plan fetched successfully",
                planFound,
            });   
       
    }),
    delete: asyncHandler(async (req, res) => {
    
        const planId = req.params.planId;
        await Plan.findByIdAndDelete(planId);
        res.json({
            status: "success",
            message: "Plan deleted successfully",
            
        });
    
    }),
    update: asyncHandler(async (req, res) => {
    
        const planId = req.params.planId;
        const planFound = await Plan.findById(planId);
        if(!planFound){
            throw new Error("Plan not found");
    }
    const planUpdated = await Plan.findByIdAndUpdate(planId, {planName: req.body.planName, features:req.body.features, price:req.body.price}, 
        {new: true}
    );
    res.json({
        
        status: "Plan updated successfully",
        planUpdated,
    });
    })    
}


module.exports = planController