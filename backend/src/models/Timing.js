const mongoose = require("mongoose");

const TimingSchema = new mongoose.Schema({
    start_time:{
        type:Date,
        default:Date.now
    },
    end_time:{
        type:Date,
        default:Date.now
    },
    day:{
        type:String,
        required:true,
        default:"1",
        enum:["0","1","2","3","4","5","6"]
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    }
});

module.exports = mongoose.model("Timing",TimingSchema);