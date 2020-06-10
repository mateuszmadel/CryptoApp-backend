const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth')
const notificationModel =require('../models/Notification');
const notificationsService =require('../services/NotificationsService');
const purchaseModel =require('../models/Purchase');
const notification = new notificationsService(notificationModel,purchaseModel);



router.post('/add',tokenAuth,async (req,res)=>{
    try {
        const item  = await notification.add(req.user.username,req.body);
        res.status(201).json(item);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports=router;