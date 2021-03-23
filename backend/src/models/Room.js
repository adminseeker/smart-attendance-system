const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    devices:[{
        device_id: {
         type:String,
         unique:true
         }
     }],
    timings:[{
        timing_id: {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Timing"
         }
     }]
});

module.exports = mongoose.model("Room",RoomSchema);