const asyncHandler = require("express-async-handler");
const { mongoose } = require("mongoose");
const Notification = require("../../models/Notification/Notification");

const notificationController = {
    

    fetchNotifications: asyncHandler(async (req, res) => {
        
                const notifications = await Notification.find();
                res.json(
                   notifications
                );
    }),
    
    readNotification: asyncHandler(async (req, res) => {
    
        const notificationId = req.params.notificationId;
        const isValidId = mongoose.Types.ObjectId.isValid(notificationId);
        if(!isValidId){
            throw new Error("Invalid notification id");
        }
       
        await Notification.findByIdAndUpdate(
            notificationId, 
            { isRead: true },
             { new: true }
            );

        res.json({
            message: "Notification read successfully",
            
    })    

    }),
};


module.exports = notificationController