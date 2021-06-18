const mongoose = require("mongoose");

const AdminAttendanceSchema = new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    lastUpdated:{
        type:Date
    }
},{collection:"adminAttendances"});

module.exports = mongoose.model("AdminAttendance",AdminAttendanceSchema);