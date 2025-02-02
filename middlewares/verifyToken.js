const jwt = require("jsonwebtoken");
function verifyToken(req,res,next){
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({message:"No token, authorization denied"});
    }
    try{
        const decoded=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=decoded.user;
        next();
    }catch(err){
        return res.status(401).json({message:"Token is not valid"});
    }
 
}

module.exports=verifyToken;