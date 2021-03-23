const mongoose = require("mongoose");

const TeacherAttendanceSchema = new mongoose.Schema({
    teacher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    },
    timing_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Timing"
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    },
    lastUpdated:{
        type:Date
    }
});

module.exports = mongoose.model("TeacherAttendance",TeacherAttendanceSchema);