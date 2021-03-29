const mongoose = require("mongoose");

const TeacherAttendanceSchema = new mongoose.Schema({
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
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

module.exports = mongoose.model("TeacherAttendance",TeacherAttendanceSchema);