const mongoose = require("mongoose");

const StudentAttendanceSchema = new mongoose.Schema({
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
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

module.exports = mongoose.model("StudentAttendance",StudentAttendanceSchema);