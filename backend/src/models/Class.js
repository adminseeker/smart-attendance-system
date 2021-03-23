const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    students:[{
        student_id: {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Student"
         }
     }],
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    },
    class_name:{
        type:String
    }
});

module.exports = mongoose.model("Class",ClassSchema);