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
    desc : "Register as admin(This route doesn't exist)",
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
    route : "/api/users/add",
    desc : "Admin adds other users (Teacher,Student)",
    auth : ["Admin"],
    method: "POST"
*/

router.post("/add",auth,async (req,res)=>{
    try {
        
        if(req.user.role!=="admin"){
            return res.status(401).json({"msg":"Not authorized user!"})
        }

        const check = await User.find({email:req.body.email});
        if(check.length!==0){
            return res.json({"msg":"Email already registered!"})
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt)
        
        const user = new User(req.body);
        await user.save();
        if(user.role=="admin"){
            const admin = new Admin({user_id:user.id})
            await admin.save()
        }
        else if(user.role=="teacher"){
            const teacher = new Teacher({user_id:user.id,usn:req.body.usn});
            await teacher.save();
        }else if(user.role=="student"){
            const student = new Student({user_id:user.id,usn:req.body.usn,semester:req.body.semester});
            await student.save();
        }else{
            return res.status(404).json("invalid user");
        }
        
        res.json({"msg":"User Added"});        
    } catch (error) {
        res.status(400).send(error);   
    }
});


/* 
    route : "/api/users/admin/me",
    desc : "Update admin profile",
    auth : ["Admin"],
    method: "PATCH"
*/

router.patch("/admin/me",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user || !user.role=="admin"){
            return res.json({"msg":"unauthorized access!"})
        }
    const updates = req.body;
    delete updates.token;
    delete updates._id;
    delete updates.id;
    delete updates.password
    const editUser = await User.findOneAndUpdate({_id:user.id},updates,{new:true}).select("-password -tokens")
    const editAdmin = await Admin.findOneAndUpdate({user_id:user.id},updates,{new:true})
    
    if(!editUser && !editAdmin){
        return res.json({"msg":"admin not found!"})
    }
    return res.json({user:editUser,admin:editAdmin});
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

/* 
    route : "/api/users/update/:id",
    desc : "Admin Update user details",
    auth : ["Admin"],
    method: "PATCH"
*/

router.patch("/update/:id",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user || !user.role=="admin"){
            return res.json({"msg":"unauthorized access!"})
        }
    
        const updates = req.body;
        delete updates.token;
        delete updates._id;
        delete updates.id;
        delete updates.password;
        const editUser = await User.findOneAndUpdate({_id:req.params.id},updates,{new:true}).select("-password -tokens")
        if(!editUser){
            return res.json({"msg":"user not found!"})
        }
        const editStudentUser = await Student.findOneAndUpdate({user_id:req.params.id},updates,{new:true})
        const editTeacherUser = await Teacher.findOneAndUpdate({user_id:req.params.id},updates,{new:true})
        if(editStudentUser){
            return res.json({user:editUser,student:editStudentUser})
        }else if(editTeacherUser){
            return res.json({user:editUser,student:editTeacherUser})
        }
        return res.json({"msg":"Update failure"})
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

/* 
    route : "/api/users/update/me",
    desc : "user updates his details",
    auth : ["Teacher","Student"],
    method: "PATCH"
*/

router.patch("/me",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(404).json({"msg":"no user found!"})
        }
    
        const updates = req.body;
        delete updates.token;
        delete updates._id;
        delete updates.id;
        delete updates.password;
        const editUser = await User.findOneAndUpdate({_id:user.id},updates,{new:true}).select("-password -tokens")
        if(!editUser){
            return res.json({"msg":"user not found and update failure!"})
        }
        return res.json(editUser)
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
