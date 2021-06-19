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
            const admin = new Admin({user:user.id})
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
    desc : "Admin adds other users (Teacher,Student,Admin)",
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
        var usn = "";
        if(req.body.usn){
            usn = req.body.usn.toUpperCase();
            const usnFromDB1 = await Teacher.findOne({usn});
            const usnFromDB2 = await Student.findOne({usn});
                if(usnFromDB1 || usnFromDB2){
                    return res.json({"msg":"USN already registered!"})
                }
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt)
        
        const user = new User(req.body);
        await user.save();
        if(user.role=="admin"){
            const admin = new Admin({user:user.id})
            await admin.save()
        }
        else if(user.role=="teacher"){
            const teacher = new Teacher({user:user.id,usn});
            await teacher.save();
        }else if(user.role=="student"){
            const student = new Student({user:user.id,usn,semester:req.body.semester});
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
    route : "/api/users/students",
    desc : "Admin gets students list",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/students",auth,async (req,res)=>{
    try {
        
        if(req.user.role!=="admin"){
            return res.status(401).json({"msg":"Not authorized user!"})
        }

        const students = await Student.find({}).populate("user",["_id","name","email","phone","role"]);
        res.json(students);       
    } catch (error) {
        res.status(400).send(error);   
    }
});

/* 
    route : "/api/users/student/:id",
    desc : "Admin gets student by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/student/:id",auth,async (req,res)=>{
    try {
        
        if(req.user.role!=="admin"){
            return res.status(401).json({"msg":"Not authorized user!"})
        }

        const student = await Student.findById(req.params.id).populate("user",["_id","name","email","phone","role"]);
        if(!student){
            return res.json({"msg":"no student found"});
        }
        return res.json(student);       
    } catch (error) {
        res.status(400).send(error);   
    }
});

/* 
    route : "/api/users/teachers",
    desc : "Admin gets teachers list",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/teachers",auth,async (req,res)=>{
    try {
        
        if(req.user.role!=="admin"){
            return res.status(401).json({"msg":"Not authorized user!"})
        }

        const teachers = await Teacher.find({}).populate("user",["_id","name","email","phone","role"]);
        res.json(teachers);       
    } catch (error) {
        res.status(400).send(error);   
    }
});

/* 
    route : "/api/users/teacher/:id",
    desc : "Admin gets teacher by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/teacher/:id",auth,async (req,res)=>{
    try {
        
        if(req.user.role!=="admin"){
            return res.status(401).json({"msg":"Not authorized user!"})
        }

        const teacher = await Teacher.findById(req.params.id).populate("user",["_id","name","email","phone","role"]);
        if(!teacher){
            return res.json({"msg":"no teacher found"});
        }
        return res.json(teacher);       
    } catch (error) {
        res.status(400).send(error);   
    }
});

/* 
    route : "/api/users/admins",
    desc : "Admin gets all admins",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/admins",auth,async (req,res)=>{
    try {
        
        if(req.user.role!=="admin"){
            return res.status(401).json({"msg":"Not authorized user!"})
        }

        const admins = await Admin.find({}).populate("user",["_id","name","email","phone","role"]);
        res.json(admins);       
    } catch (error) {
        res.status(400).send(error);   
    }
});

/* 
    route : "/api/users/admin/:id",
    desc : "Admin gets admin by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/admin/:id",auth,async (req,res)=>{
    try {
        
        if(req.user.role!=="admin"){
            return res.status(401).json({"msg":"Not authorized user!"})
        }

        const admin = await Admin.findById(req.params.id).populate("user",["_id","name","email","phone","role"]);
        if(!admin){
            return res.json({"msg":"no admin found"});
        }
        return res.json(admin);       
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
    if(updates.email){
        const r = await User.find({email:updates.email});
        if(r.length!==0){
            return res.json({"msg":"This email already registered!"})
        }
    }
    const editUser = await User.findOneAndUpdate({_id:user.id},updates,{new:true}).select("-password -tokens")
    const editAdmin = await Admin.findOneAndUpdate({user:user.id},updates,{new:true})
    
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
        const editUser = await User.findOneAndUpdate({_id:req.params.id},updates,{new:true}).select("-password -tokens")
        if(!editUser){
            return res.json({"msg":"user not found!"})
        }
        if(updates.usn){
            updates.usn = updates.usn.toUpperCase();
            const usnFromDB1 = await Teacher.findOne({usn:updates.usn});
            const usnFromDB2 = await Student.findOne({usn:updates.usn});
            if(usnFromDB1 || usnFromDB2){
                return res.json({"msg":"USN already registered!"})
            }
        }
        if(updates.email){
            const check = await User.find({email:req.body.email});
        if(check.length!==0){
            return res.json({"msg":"Email already registered!"})
        }
        }
        const editStudentUser = await Student.findOneAndUpdate({user:req.params.id},updates,{new:true})
        const editTeacherUser = await Teacher.findOneAndUpdate({user:req.params.id},updates,{new:true})
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
        delete updates.email;
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

/* 
    route : "/api/users/:id",
    desc : "Admin removes user by his id",
    auth : ["Admin"],
    method: "PATCH"
*/

router.delete("/:id",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(!user || !user.role=="admin"){
            return res.json({"msg":"unauthorized access!"})
        }
    
        const UserToDelete = await User.findById(req.params.id);
        if(!UserToDelete){
            return res.json({"msg":"user not found!"})
        }
        if(UserToDelete.role=="student"){
            const deletedUser = await User.deleteOne({_id:req.params.id})
            const student = await Student.deleteOne({user:req.params.id});
            return res.json({"msg":"Student deleted"})
        }else if(UserToDelete.role=="teacher"){
            const deletedUser = await User.deleteOne({_id:req.params.id})
            const teacher = await Teacher.deleteOne({user:req.params.id});
            return res.json({"msg":"Teacher deleted"})
        }else if(UserToDelete.role=="admin"){
            return res.json({"msg":"Admin user cannot be deleted"})
        }
        return res.json({"msg":"Something went wrong"})
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

module.exports = router;
