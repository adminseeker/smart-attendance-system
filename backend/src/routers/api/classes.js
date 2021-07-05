const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

const Class = require('../../models/Class');
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');

const mailer = require('../../mailer/mailer');

const router = express.Router();

/* 
    route : "/api/classes/",
    desc : "Create a class",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }

    const _class = new Class({
      class_name: req.body.class_name,
    });
    await _class.save();
    res.json(_class);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/students",
    desc : "Add students to the class",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/:id/students', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    let studentsBody = req.body.students;
    let set = new Set(studentsBody);
    let students = Array.from(set);

    if (students.length !== studentsBody.length) {
      return res.json({ msg: 'student repeated!' });
    }
    students = students.map((student) => {
      return { student: student };
    });
    const r = await Student.find({ _id: { $in: studentsBody } });
    if (r.length == 0) {
      return res.json({ msg: 'This contains non-existent student id!' });
    }
    const check = await Class.find({
      _id: req.params.id,
      students: { $in: students },
    });
    if (check.length !== 0) {
      return res.json({
        msg: 'This student is already registered in this class!',
      });
    }
    const updated = await Class.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { students } },
      { new: true }
    );
    if (!updated) {
      return res.json({ msg: 'class not found or some error in updating!' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/students",
    desc : "Add students to the class by their usn",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/:id/students/usn', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    let studentsBody = req.body.students;
    let set = new Set(studentsBody);
    let students = Array.from(set);

    if (students.length !== studentsBody.length) {
      return res.json({ msg: 'student repeated!' });
    }
    const r = await Student.find({ usn: { $in: studentsBody } });
    if (r.length == 0) {
      return res.json({ msg: 'This contains non-existent student id!' });
    }
    studentIDS = r.map((student) => ({ student: student._id }));
    console.log('blah blah', studentIDS);
    const check = await Class.find({
      _id: req.params.id,
      students: { $in: studentIDS },
    });
    if (check.length !== 0) {
      return res.json({
        msg: 'This student is already registered in this class!',
      });
    }
    const updated = await Class.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { students: studentIDS } },
      { new: true }
    );
    if (!updated) {
      return res.json({ msg: 'class not found or some error in updating!' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/teacher",
    desc : "Add teacher to the class",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/:id/teacher', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const result = await Teacher.findById(req.body.teacher);
    if (!result) {
      return res.json({ msg: 'Teacher not found or some error in updating!' });
    }
    const updated = await Class.findOneAndUpdate(
      { _id: req.params.id },
      { teacher: req.body.teacher },
      { new: true }
    );
    if (!updated) {
      return res.json({ msg: 'class not found or some error in updating!' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/teacher/usn",
    desc : "Add teacher to the class by usn",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/:id/teacher/usn', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const result = await Teacher.findOne({ usn: req.body.usn });
    if (!result) {
      return res.json({ msg: 'Teacher not found or some error in updating!' });
    }
    const updated = await Class.findOneAndUpdate(
      { _id: req.params.id },
      { teacher: result._id },
      { new: true }
    );
    if (!updated) {
      return res.json({ msg: 'class not found or some error in updating!' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/",
    desc : "Get classes",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const classes = await Class.find({});
    res.json(classes);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id",
    desc : "Get class by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/:id', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const _class = await Class.findById(req.params.id);
    if (!_class) {
      return res.status(404).json({ msg: 'Class not found!' });
    }
    res.json(_class);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/students",
    desc : "Get students in a class by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/:id/students', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const _class = await Class.findById(req.params.id);
    if (!_class) {
      return res.status(404).json({ msg: 'class not found!' });
    }
    const data = await Class.findById(req.params.id)
      .populate('students.student')
      .populate({
        path: 'students.student',
        model: 'Student',
        populate: {
          path: 'user',
          model: 'User',
          select: '_id name email phone role',
        },
      });
    res.json(data.students);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/students/teacher",
    desc : "Get students in a class by id",
    auth : ["Teacher"],
    method: "GET"
*/

router.get('/:id/students/teacher', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'teacher') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const teacher = await Teacher.findOne({ user: req.user.id });
    const _class = await Class.findOne({
      _id: req.params.id,
      teacher: teacher.id,
    });
    if (!_class) {
      return res.status(404).json({ msg: 'class not found!' });
    }
    const data = await Class.findById(req.params.id)
      .populate('students.student')
      .populate({
        path: 'students.student',
        model: 'Student',
        populate: {
          path: 'user',
          model: 'User',
          select: '_id name email phone role',
        },
      });
    res.json(data.students);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/teacher",
    desc : "Get teacher in a class by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/:id/teacher', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const _class = await Class.findById(req.params.id);
    if (!_class) {
      return res.status(404).json({ msg: 'class not found!' });
    }
    const data = await Class.findById(req.params.id)
      .populate('teacher')
      .populate({
        path: 'teacher',
        model: 'Teacher',
        populate: {
          path: 'user',
          model: 'User',
          select: '_id name email phone role',
        },
      });
    res.json(data.teacher);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id/name",
    desc : "update class name",
    auth : ["Admin"],
    method: "PATCH"
*/
router.patch('/:id/name', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const updated = await Class.findOneAndUpdate(
      { _id: req.params.id },
      { class_name: req.body.class_name },
      { new: true }
    );
    if (!updated) {
      return res.json({ msg: 'class not found!' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/class_id/student/student_id",
    desc : "remove student from the class",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete('/:id/student/:id2', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    let student = { student: req.params.id2 };
    const _class = await Class.findOneAndUpdate(
      { _id: req.params.id, students: student },
      { $pull: { students: student } }
    );
    if (!_class) {
      return res.status(404).json({ msg: 'class or student not found!' });
    }
    res.json({ msg: 'student removed!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/class_id/teacher/teacher_id",
    desc : "remove teacher from the class",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete('/:id/teacher/:id2', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    let teacher = req.params.id2;
    const _class = await Class.findOneAndUpdate(
      { _id: req.params.id, teacher: teacher },
      { teacher: null }
    );
    if (!_class) {
      return res.status(404).json({ msg: 'class or teacher not found!' });
    }
    res.json({ msg: 'teacher removed!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/classes/:id",
    desc : "Delete class by id",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete('/:id', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const _class = await Class.findOneAndDelete({ _id: req.params.id });
    if (!_class) {
      return res.status(404).json({ msg: 'Class not found!' });
    }
    res.json({ msg: 'Class deleted!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

module.exports = router;
