const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth')
const notificationModel =require('../models/Notification');
const notificationsService =require('../services/NotificationsService');
const purchaseModel =require('../models/Purchase');
const notification = new notificationsService(notificationModel,purchaseModel);
const sseConnection=require('../services/SseConnection')
let connectedUsers=[];


router.post('/add',tokenAuth,async (req,res)=>{
    try {
        const item  = await notification.add(req.user.username,req.body);
        if(connectedUsers[req.user.username]!==undefined)
        connectedUsers[req.user.username].add(item)
        res.status(201).json(item);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/SSE',tokenAuth,async (req,res)=>{
    try {
        connectedUsers[req.user.username]=new sseConnection(notificationModel,req.user.username)
        await connectedUsers[req.user.username].getAll()
        res.writeHead(200,connectedUsers[req.user.username].sseHeader)
         let interval=setInterval(async ()=>{
             console.log(connectedUsers)
             let notifData=await connectedUsers[req.user.username].check(notificationModel)
             if(Array.isArray(notifData) && notifData.length)
                 res.write(`data: ${JSON.stringify(notifData)}\n\n`)
             else
                 res.write(`:\n\n`);
        },45000)
        res.write(`:\n\n`);

        req.on("close", function() {
            console.log('sse connection closed')
            // Breaks the interval loop on client disconnected
            clearInterval(interval);
            delete connectedUsers[req.user.username]
        });


    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports=router;