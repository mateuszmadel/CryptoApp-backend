const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth')
const coinsData = require('../middlewares/coinsData')
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

router.get('/',tokenAuth, async (req,res)=>{
    let obj=new CurrencyConverterService(data)
    res.send(obj.convert(req.query.from,req.query.to,req.query.amount))
})

module.exports= router;