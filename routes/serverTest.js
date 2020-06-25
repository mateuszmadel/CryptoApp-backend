const router = require('express').Router();

router.get('/',async (req,res)=>{
    res.send('online')
})

module.exports= router;