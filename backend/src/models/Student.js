const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    user:{
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
        default:""
    }
    
});

module.exports = mongoose.model("Student",StudentSchema);