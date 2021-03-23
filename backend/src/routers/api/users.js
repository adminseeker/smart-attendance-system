const express = require("express");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const generateAuthToken = require("../../token/generateAuthToken");

const User = require("../../models/User");
const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");
const Admin = require("../../models/Admin");


const router = express.Router();



/* 
    route : "/api/users",
    desc : "Register as Teacher or Student",
    auth : "PUBLIC",
    method: "POST"
*/

router.post("/",async (req,res)=>{
    try {
        
        const check = await User.find({email:req.body.email});
        if(check.length!==0){
            return res.json({"msg":"Email already registered!"})
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt)
        
        const user = new User(req.body);
        generateAuthToken(user.id,user.role,(token)=>{
            user.tokens =user.tokens.concat({token})
        });
        if(user.role=="admin"){
            const admin = new Admin({user_id:user.id})
            await admin.save()
        }
        // if(user.isTeacher){
        //     const teacher = new Teacher({});
        //     await teacher.save();
        // }else{
        //     const student = new Student({});
        //     user.student = student.id;
        //     await student.save();
        // }
        await user.save();
        res.json(user.tokens[user.tokens.length-1]);        
    } catch (error) {
        res.status(400).send(error);   
    }
});

/* 
    route : "/api/users",
    desc : "Update profile",
    auth : ["Admin"],
    method: "PATCH"
*/

router.patch("/",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user || !user.role=="admin"){
            return res.json({"msg":"User Not Found or no access!"})
        }
    const updates = req.body;
    delete updates.token;
    delete updates._id;
    delete updates.id;
    if(updates.password){
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password,salt)
    }
    const editUser = await User.findOneAndUpdate({_id:user.id},updates,{new:true}).select("-password")    
    res.json(editUser);
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

/* 
    route : "/api/users",
    desc : "Update password",
    auth : ["Teacher","Student","Admin"],
    method: "PATCH"
*/

router.patch("/password",auth,async (req,res)=>{
    try {
    let newPassword = req.body.newPassword;
    const password = req.body.password;
    if(newPassword && password){
        const user = await User.findOne({_id:req.user.id});
        if(!user){
            return res.status(400).json({errors:[{msg:"invalid user!"}]});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({code:"0",msg:"incorrect current password!"});
        }
        const salt = await bcrypt.genSalt(10);
        newPassword = await bcrypt.hash(newPassword,salt);
        user.password = newPassword;
        await user.save();
        return res.json({code:"1","msg":"Password Changed Successfully!"});
    }
        return res.json({code:"2","msg":"Error in changing password!"});

    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

module.exports = router;
