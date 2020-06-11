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

router.get('/SSE',tokenAuth,async (req,res)=>{
    try {
        res.writeHead(200,notification.sseHeader)
         let interval=setInterval(async ()=>{
             let notifData=await notification.check(req.user.username)
             if(Array.isArray(notifData) && notifData.length)
                 res.write(`data: ${JSON.stringify(notifData)}\n\n`)
             else
                 res.write(`:\n\n`);
        },15000)
        res.write(`:\n\n`);

        req.on("close", function() {
            console.log('sse connection closed')
            // Breaks the interval loop on client disconnected
            clearInterval(interval);
        });


    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports=router;