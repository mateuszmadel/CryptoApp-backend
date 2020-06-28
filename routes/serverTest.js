const router = require('express').Router();
const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');
const client = new CoinpaprikaAPI();
router.get('/',async (req,res)=>{
    try {
        await client.getGlobal()
        res.status(200).send('online')
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports= router;