const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    access_id:{
        type:String,
        require:true,
        unique:true
    }
    
});

module.exports = mongoose.model("Admin",AdminSchema);