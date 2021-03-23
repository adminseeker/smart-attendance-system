const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    usn:{
        type:String,
        require:true
    },
    access_id:{
        type:String,
        require:true,
        unique:true
    }
    
});

module.exports = mongoose.model("Teacher",TeacherSchema);