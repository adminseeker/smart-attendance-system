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
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    }
});

module.exports = mongoose.model("Timing",TimingSchema);