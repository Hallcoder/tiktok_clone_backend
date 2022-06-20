require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports.Auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const payLoad = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        console.log('payLoad:',payLoad);
        if(!payLoad) return res.status(403).json({message:'Unauthorized',status:'failed'});
        req.user = payLoad;
        next();
    } catch (error) {
         console.log(error);
         return res.status(500).json({message:"Internal Server Error"});
         next
    }
}