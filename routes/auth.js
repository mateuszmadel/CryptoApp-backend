const router = require('express').Router();
const UserService =require('../services/UserService');
const User =require('../models/User');
const userServiceInstance = new UserService(User);



router.post('/register', async (req, res)=>{
    try {
        const  user  = await userServiceInstance.register(req.body);
        res.status(201).json(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/login', async (req, res)=> {
    try {
        const token=await userServiceInstance.login(req.body)
        res.header('auth-token',token).send(token);
    } catch (e) {
        res.status(400).send(e.message);
    }
});


module.exports = router;
