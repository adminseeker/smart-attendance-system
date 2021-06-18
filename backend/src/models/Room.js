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
    //  ,
    //  timetable:[{
    //      day:[{
    //         class:{
    //             type:mongoose.Schema.Types.ObjectId,
    //             ref:"Class",
    //             required:true
    //         },
    //         start_time:{
    //             type:Date,
    //             default:Date.now
    //         },
    //         end_time:{
    //             type:Date,
    //             default:Date.now
    //         }
    //      }]
        
    //  }]
});

module.exports = mongoose.model("Room",RoomSchema);