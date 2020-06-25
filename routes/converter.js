const router = require('express').Router();
const CurrencyConverterService=require('../services/CurrencyConverterService')


router.post('/',async (req,res)=>{
    let obj=new CurrencyConverterService(data)
    res.json(obj.convert(req.body.from,req.body.to,req.body.amount))
})

module.exports= router;