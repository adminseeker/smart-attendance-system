const jwt = require("jsonwebtoken");

const generateAuthToken = (id,role,cb)=>{
    const payload = {
        user:{
            id,
            role
        }
    };
    jwt.sign(payload,process.env.JWT_SECRET,(error,token)=>{
        if(error) throw error;
        cb(token);
    })
}

module.exports = generateAuthToken;