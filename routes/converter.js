const router = require('express').Router();
const coinsData = require('../middlewares/coinsData')
const tokenAuth = require('../middlewares/tokenAuth')
const CurrencyConverterService=require('../services/CurrencyConverterService')

let data;
function getData( fn, delay ) {
    fn();
    setInterval( fn, delay );
}
getData(async function(){
    data=await coinsData();
    console.log("updated")
},60000)
router.get('/list',tokenAuth, async (req,res)=>{
    let obj=new CurrencyConverterService(data)
    res.json(obj.listOfCurrencies())
})
router.post('/convert',tokenAuth,async (req,res)=>{
    let obj=new CurrencyConverterService(data)
    res.json(obj.convert(req.body.from,req.body.to,req.body.amount))
})

module.exports= router;