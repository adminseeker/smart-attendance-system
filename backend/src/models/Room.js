const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    devices:[{
        device: {
         type:String
         },
         _id:false
     }],
    timings:[{
        timing: {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Timing"
         },
         _id:false
     }],
     room_name:{
         type:String,
         required:true
     }
});

module.exports = mongoose.model("Room",RoomSchema);