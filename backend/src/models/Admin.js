const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    access_id:{
        type:String,
        default:""
    }
    
});

module.exports = mongoose.model("Admin",AdminSchema);