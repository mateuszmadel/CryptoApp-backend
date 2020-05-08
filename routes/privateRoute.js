const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth')
router.get('/',tokenAuth,(req,res)=>{
    res.send(req.user)
})

module.exports= router;