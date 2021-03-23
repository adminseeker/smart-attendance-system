const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    usn:{
        type:String,
        require:true
    },
    semester:{
        type:String,
        require:true
    },
    access_id:{
        type:String,
        unique:true
    }
    
});

module.exports = mongoose.model("Student",StudentSchema);