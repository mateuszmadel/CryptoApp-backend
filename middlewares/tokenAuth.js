const jwt = require('jsonwebtoken');

module.exports=function(req,res,next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(400).send('Access denied')
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();
    }catch(e){
        res.status(400).send('Invalid token')
    }
}
