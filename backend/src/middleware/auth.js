const jwt = require("jsonwebtoken");

const User = require("../models/User");

const auth = async (req,res,next)=>{
    try {
        const token = req.header("x-auth-token");
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user =await User.findOne({_id:decodedToken.user.id,role:decodedToken.user.role,"tokens.token":token}).select("-password");
        if(!user){
            throw new Error();
        }
        req.user=user;
        req.token=token;
        next();
    } catch (error) {
        res.status(401).json({error:"Invalid Token!"});
    }
};

module.exports = auth;