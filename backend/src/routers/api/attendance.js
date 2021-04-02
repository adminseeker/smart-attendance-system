const express = require("express");

const auth = require("../../middleware/auth");

const User = require("../../models/User");

const Class = require("../../models/Class");

const mailer = require("../../mailer/mailer");

const mqtt = require("../../utils/mqtt_handler");
const {get_rfid_id} = require("../../utils/rfid_handler");
const Student = require("../../models/Student");
const Admin = require("../../models/Admin");
const Teacher = require("../../models/Teacher");

const router = express.Router();




/* 
    route : "/api/attendance/user/user_id/",
    desc : "Add/Update User Access Card",
    auth : ["Admin"],
    method: "POST"
*/
router.post("/user/:id",auth,async (req,res)=>{
    try {
        const inuser = req.user;
        if(inuser.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const user = await User.findById(req.params.id);
        if(!user){
            await mqtt.send("rfid_reply","false")
            return res.status(404).json({"msg":"User not found!"});
        }
        if(user.role=="student"){
            const id = await get_rfid_id();
            const student = await Student.findOneAndUpdate({user:req.params.id},{access_id:id},{new:true});
            if(student){
                await mqtt.send("rfid_reply","true")
                return res.json(student)
            }
            await mqtt.send("rfid_reply","false")
            return res.json({"msg":"unable to add!"})
        }else if(user.role=="teacher"){
            const id = await get_rfid_id();
            const teacher = await Teacher.findOneAndUpdate({user:req.params.id},{access_id:id},{new:true});
            if(teacher){
                await mqtt.send("rfid_reply","true")
                return res.json(teacher)
            }
            await mqtt.send("rfid_reply","false")
            return res.json({"msg":"unable to add!"})
        }else if(user.role=="admin"){
            const id = await get_rfid_id();
            const admin = await Admin.findOneAndUpdate({user:req.params.id},{access_id:id},{new:true});
            if(admin){
                await mqtt.send("rfid_reply","true")
                return res.json(admin)
            }
            await mqtt.send("rfid_reply","false")
            return res.json({"msg":"unable to add!"})
        }
        await mqtt.send("rfid_reply","false")
        return res.json({"msg":"unable to add!"})
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});


module.exports = router;