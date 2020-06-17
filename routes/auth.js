const router = require('express').Router();
const tokenAuth = require('../middlewares/tokenAuth')
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
router.put('/settings',tokenAuth, async (req, res)=> {
    try {
        await userServiceInstance.changeCredentials(req.body,req.user.username)
        res.status(201).send('Dane zostały zaktualizowane')
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/forgotpassword', async (req, res)=> {
    try {
        await userServiceInstance.passwordRecovery(req.body,req.headers.host)
        res.status(201).send('ss')
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/reset/:token', async (req, res)=> {
    try {
        let readStream=await userServiceInstance.checkRecoveryToken(req.params.token)
        readStream.pipe(res)
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/reset/:token', async (req, res)=> {
    try {
        res.json(await userServiceInstance.resetPassword(req.params.token,req.body))
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
