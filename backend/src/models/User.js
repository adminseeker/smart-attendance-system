const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    role:{
        type:String,
        require:true,
        enum:["admin","student","teacher"]  
    },
    tokens:[{
        token:{
            type:String,
            required:true
        },
        _id:false
    }],
    date:{
        type:Date,
        default:Date.now
    }  
});

module.exports = mongoose.model("User",UserSchema);