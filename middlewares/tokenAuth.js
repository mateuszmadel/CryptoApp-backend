const jwt = require('jsonwebtoken');

module.exports=function(req,res,next){
    let token;
    if(req.query.token!==undefined)
         token= req.query.token
    else
        token = req.header('auth-token');
    if(!token){
        return res.status(400).send('Odmowa dostępu')
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();
    }catch(e){
        res.status(400).send('Invalid token')
    }
}
