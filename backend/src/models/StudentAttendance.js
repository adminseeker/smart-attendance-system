const mongoose = require("mongoose");

const StudentAttendanceSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    timing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Timing"
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    },
    lastUpdated:{
        type:Date
    }
});

module.exports = mongoose.model("StudentAttendance",StudentAttendanceSchema);