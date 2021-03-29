const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    students:[{
        student: {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Student"
         },
         _id:false
     }],
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        default:null
    },
    class_name:{
        type:String
    }
});

module.exports = mongoose.model("Class",ClassSchema);