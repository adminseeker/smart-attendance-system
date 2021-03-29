const express = require("express");

const auth = require("../../middleware/auth");

const User = require("../../models/User");

const Class = require("../../models/Class");

const mailer = require("../../mailer/mailer");

const router = express.Router();


/* 
    route : "/api/classes/",
    desc : "Create a class",
    auth : ["Admin"],
    method: "POST"
*/
router.post("/",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }

        const _class = new Class({
            class_name:req.body.class_name
        });
        await _class.save();
        res.json(_class);
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});

/* 
    route : "/api/classes/:id/students",
    desc : "Add students to the class",
    auth : ["Admin"],
    method: "POST"
*/
router.post("/:id/students",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        let studentsBody= req.body.students
        let set = new Set(studentsBody);
        let students = Array.from(set);
        
        if(students.length!==studentsBody.length){
            return res.json({"msg":"student repeated!"})
        }
        students = students.map((student)=>{
            return {student:student}
        })
        const check = await Class.find({_id:req.params.id,students:{$in:students}})
        if(check.length!==0){
            return res.json({"msg":"This student is already registered in this class!"})
        }
        const updated = await Class.findOneAndUpdate({_id:req.params.id},{$addToSet:{students}},{new:true});
        if(!updated){
            return res.json({"msg":"class not found or some error in updating!"})
        }
        res.json(updated);
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});

/* 
    route : "/api/classes/:id/teacher",
    desc : "Add teacher to the class",
    auth : ["Admin"],
    method: "POST"
*/
router.post("/:id/teacher",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const updated = await Class.findOneAndUpdate({_id:req.params.id},{teacher:req.body.teacher},{new:true});
        if(!updated){
            return res.json({"msg":"class not found or some error in updating!"})
        }
        res.json(updated);
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});


/* 
    route : "/api/classes/",
    desc : "Get classes",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const classes = await Class.find({});
        res.json(classes)
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error); 
    }
});

/* 
    route : "/api/classes/:id",
    desc : "Get class by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/:id",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const _class = await Class.findById(req.params.id);
        if(!_class){
            return res.status(404).json({"msg":"Class not found!"});
        }
        res.json(_class)
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error); 
    }
});

/* 
    route : "/api/classes/:id/students",
    desc : "Get students in a class by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/:id/students",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const _class = await Class.findById(req.params.id);
        if(!_class){
            return res.status(404).json({"msg":"class not found!"});
        }
        const data = await Class.findById(req.params.id).populate("students.student").populate({path:"students.student",model:"Student",populate:{path:"user",model:"User",select:"_id name email phone role"}});
        res.json(data.students)
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error); 
    }
});

/* 
    route : "/api/classes/:id/teacher",
    desc : "Get teacher in a class by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get("/:id/teacher",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const _class = await Class.findById(req.params.id);
        if(!_class){
            return res.status(404).json({"msg":"class not found!"});
        }
        const data = await Class.findById(req.params.id).populate("teacher").populate({path:"teacher",model:"Teacher",populate:{path:"user",model:"User",select:"_id name email phone role"}});
        res.json(data.teacher)
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error); 
    }
});

/* 
    route : "/api/classes/:id/name",
    desc : "update class name",
    auth : ["Admin"],
    method: "PATCH"
*/
router.patch("/:id/name",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const updated = await Class.findOneAndUpdate({_id:req.params.id},{class_name:req.body.class_name},{new:true});
        if(!updated){
            return res.json({"msg":"class not found!"})
        }
        res.json(updated);
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error);
    }
});

/* 
    route : "/api/classes/:id/student",
    desc : "remove student from the class",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete("/:id/student",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        let student = {student:req.body.student}
        const _class = await Class.findOneAndUpdate({_id:req.params.id,students:student},{$pull:{students:student}});
        if(!_class){
            return res.status(404).json({"msg":"class or student not found!"});
        }
        res.json({"msg":"student removed!"});
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error); 
    }
});

/* 
    route : "/api/classes/:id/teacher",
    desc : "remove teacher from the class",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete("/:id/teacher",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        let teacher = req.body.teacher
        const _class = await Class.findOneAndUpdate({_id:req.params.id,teacher:teacher},{teacher:null});
        if(!_class){
            return res.status(404).json({"msg":"class or teacher not found!"});
        }
        res.json({"msg":"teacher removed!"});
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error); 
    }
});

/* 
    route : "/api/classes/:id",
    desc : "Delete class by id",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete("/:id",auth,async (req,res)=>{
    try {
        const user = req.user;
        if(user.role!="admin"){
            return res.status(401).json({"msg":"Authorization denied!"});
        }
        const _class = await Class.findOneAndDelete({_id:req.params.id})
        if(!_class){
            return res.status(404).json({"msg":"Class not found!"});
        }
        res.json({"msg":"Class deleted!"});
    } catch (error) {
        res.status(500).send("Server Error!");
        console.log(error); 
    }
});

module.exports = router;