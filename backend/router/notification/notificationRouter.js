const express = require("express");
const notificationRouter = express.Router();
const notificationController = require("../../controllers/notifications/notificationController");



notificationRouter.get("/notifications", notificationController.fetchNotifications);

notificationRouter.put('/:notificationId', notificationController.readNotification);


module.exports = notificationRouter;