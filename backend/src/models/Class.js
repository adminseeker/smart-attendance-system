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
    },
    total_classes:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("Class",ClassSchema);