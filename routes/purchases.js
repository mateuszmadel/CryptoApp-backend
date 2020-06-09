const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth')
const purchasesService =require('../services/PurchasesService');
const purchaseModel =require('../models/Purchase');
const PurchasesServiceInstance = new purchasesService(purchaseModel);

router.post('/',tokenAuth,async (req,res)=>{
    try {
        const item  = await PurchasesServiceInstance.add(req.body,req.user);
        res.status(201).json(item);
    } catch (e) {
        res.status(400).send(e.message);
    }
})
router.get('/',tokenAuth,async (req,res)=>{
    try {
        const item  = await PurchasesServiceInstance.getAll(req.user,data);
        res.status(201).json(item);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

module.exports= router;