const express = require('express');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

const Class = require('../../models/Class');

const mqtt = require('../../utils/mqtt_handler');
const { get_rfid_id } = require('../../utils/rfid_handler');
const Student = require('../../models/Student');
const StudentAttendance = require('../../models/StudentAttendance');
const TeacherAttendance = require('../../models/TeacherAttendance');
const AdminAttendance = require('../../models/AdminAttendance');
const Admin = require('../../models/Admin');
const Teacher = require('../../models/Teacher');

const router = express.Router();

/* 
    route : "/api/attendance/user/user_id/",
    desc : "Add/Update User Access Card",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/user/:id', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }
    const id = await get_rfid_id();

    if (user.role == 'student') {
      const teacher = await Teacher.findOne({ access_id: id });
      const admin = await Admin.findOne({
        $or: [{ access_id: id }, { admin_access_id: id }],
      });
      const student = await Student.findOne({ access_id: id });
      if (!admin && !teacher && !student) {
        const student = await Student.findOneAndUpdate(
          { user: req.params.id },
          { access_id: id },
          { new: true }
        );
        await mqtt.send('rfid_reply', 'true');
        return res.json(student);
      }
      await mqtt.send('rfid_reply', 'false');
      return res.json({
        msg: 'access card already registered, try using new access card!',
      });
    } else if (user.role == 'teacher') {
      const student = await Student.findOne({ access_id: id });
      const teacher = await Teacher.findOne({ access_id: id });
      const admin = await Admin.findOne({
        $or: [{ access_id: id }, { admin_access_id: id }],
      });
      if (!admin && !teacher && !student) {
        const teacher = await Teacher.findOneAndUpdate(
          { user: req.params.id },
          { access_id: id },
          { new: true }
        );
        await mqtt.send('rfid_reply', 'true');
        return res.json(teacher);
      }
      await mqtt.send('rfid_reply', 'false');
      return res.json({
        msg: 'access card already registered, try using new access card!',
      });
    } else if (user.role == 'admin') {
      const student = await Student.findOne({ access_id: id });
      const teacher = await Teacher.findOne({ access_id: id });
      const admin = await Admin.findOne({
        $or: [{ access_id: id }, { admin_access_id: id }],
      });
      if (!admin && !teacher && !student) {
        const admin = await Admin.findOneAndUpdate(
          { user: req.params.id },
          { access_id: id },
          { new: true }
        );
        await mqtt.send('rfid_reply', 'true');
        return res.json(admin);
      }
      await mqtt.send('rfid_reply', 'false');
      return res.json({
        msg: 'access card already registered, try using new access card!',
      });
    }
    await mqtt.send('rfid_reply', 'false');
    return res.json({ msg: 'unable to add!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/attendance/admin/user_id/admin_access_id/",
    desc : "Add/Update Admin Access Card",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/admin/:id/admin_access_id', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const user = await User.findById(req.params.id);
    if (!user || user.role != 'admin') {
      return res.status(404).json({ msg: 'Admin user not found!' });
    }
    const id = await get_rfid_id();

    if (user.role == 'admin') {
      const student = await Student.findOne({ access_id: id });
      const teacher = await Teacher.findOne({ access_id: id });
      const admin = await Admin.findOne({
        $or: [{ access_id: id }, { admin_access_id: id }],
      });
      if (!admin && !teacher && !student) {
        const admin = await Admin.findOneAndUpdate(
          { user: req.params.id },
          { admin_access_id: id },
          { new: true }
        );
        await mqtt.send('rfid_reply', 'true');
        return res.json(admin);
      }
      await mqtt.send('rfid_reply', 'false');
      return res.json({ msg: 'Access ID already registered!' });
    }
    await mqtt.send('rfid_reply', 'false');
    return res.json({ msg: 'unable to add!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/attendance/student/user_id/",
    desc : "GET Student Attendance for all classes",
    auth : ["Admin","Student"],
    method: "GET"
*/
router.get('/student/:id', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role == 'teacher') {
      return res.status(404).json({ msg: 'Authorization denied!' });
    }
    let student;
    if (inuser.role == 'student') {
      student = await Student.findOne({ user: req.user.id });
      if (student.id !== req.params.id) {
        return res.status(404).json({ msg: 'Authorization denied!' });
      }
    }

    const classes = await Class.find({
      'students.student': req.params.id,
    }).select('-students');
    const attendance = await StudentAttendance.find({ student: req.params.id });
    return res.json({ classes, attendance });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/attendance/teacher/user_id/",
    desc : "GET teacher Attendance for all classes",
    auth : ["Admin","Teacher"],
    method: "GET"
*/
router.get('/teacher/:id', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role == 'student') {
      return res.status(404).json({ msg: 'Authorization denied!' });
    }
    let student;
    if (inuser.role == 'teacher') {
      teacher = await Teacher.findOne({ user: req.user.id });
      if (teacher.id !== req.params.id) {
        return res.status(404).json({ msg: 'Authorization denied!' });
      }
    }

    const classes = await Class.find({ teacher: req.params.id }).select(
      '-students'
    );
    const attendance = await TeacherAttendance.find({ teacher: req.params.id });
    return res.json({ classes, attendance });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/attendance/teacher/user_id/classes",
    desc : "GET Student Attendance for all classes by teacher",
    auth : ["Admin","Teacher"],
    method: "GET"
*/
router.get('/teacher/:id/classes', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role == 'student') {
      return res.status(404).json({ msg: 'Authorization denied!' });
    }
    let student;
    if (inuser.role == 'teacher') {
      teacher = await Teacher.findOne({ user: req.user.id });
      if (teacher.id !== req.params.id) {
        return res.status(404).json({ msg: 'Authorization denied!' });
      }
    }

    const classes = await Class.find({ teacher: req.params.id });
    const classIds = classes.map((_class) => {
      return _class.id;
    });
    const attendance = await StudentAttendance.find({
      class: { $in: classIds },
    });
    return res.json({ classes, attendance });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/attendance/admin/user_id/",
    desc : "GET admin Attendance by admins ids",
    auth : ["Admin"],
    method: "GET"
*/
router.get('/admin/:id', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role == 'student' || inuser.role == 'teacher') {
      return res.status(404).json({ msg: 'Authorization denied!' });
    }

    admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ msg: 'Admin user not found!' });
    }
    const attendance = await AdminAttendance.find({ admin: req.params.id });
    return res.json({ attendance });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/attendance/student/report/user_id/",
    desc : "GET student attendance as a csv base64",
    auth : ["Student,Admin"],
    method: "GET"
*/
router.get('/student/report/:id', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role == 'teacher') {
      return res.status(404).json({ msg: 'Authorization denied!' });
    }
    let student;
    if (inuser.role == 'student') {
      student = await Student.findOne({ user: req.user.id });
      if (student.id !== req.params.id) {
        return res.status(404).json({ msg: 'Authorization denied!' });
      }
    }

    const classes = await Class.find({
      'students.student': req.params.id,
    }).select('-students');
    const attendance = await StudentAttendance.find({ student: req.params.id });

    const sol = classes.map((_class) => {
      const solTemp = {};
      solTemp.class_name = _class.class_name;
      solTemp.total_classes = _class.total_classes;
      solTemp.attend_classes = attendance.filter(
        (att) => _class.id == att.class
      ).length;
      return solTemp;
    });

    return res.json(sol);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/attendance/teacher/report/user_id/class_id",
    desc : "GET Attendance Report of a class",
    auth : ["Admin","Teacher"],
    method: "GET"
*/
router.get('/teacher/report/:id1/:id2', auth, async (req, res) => {
  try {
    const inuser = req.user;
    if (inuser.role == 'student') {
      return res.status(404).json({ msg: 'Authorization denied!' });
    }
    let teacher;
    if (inuser.role == 'teacher') {
      teacher = await Teacher.findOne({ user: req.user.id });
      if (teacher.id !== req.params.id1) {
        return res.status(404).json({ msg: 'Authorization denied!' });
      }
    }

    const _class = await Class.findOne({
      teacher: req.params.id1,
      _id: req.params.id2,
    })
      .populate('students.student')
      .populate({
        path: 'students.student',
        model: 'Student',
        select: 'usn',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name',
        },
      });

    const attendance = await StudentAttendance.find({
      class: req.params.id2,
    });

    const arr = [];
    for (let i = 0; i < _class.students.length; i++) {
      const solTemp = {};
      solTemp.student_usn = _class.students[i].student.usn;
      solTemp.student_name = _class.students[i].student.user.name;
      solTemp.total_classes = _class.total_classes;
      solTemp.attend_classes = attendance.filter(
        (att) =>
          _class.id == att.class && _class.students[i].student.id == att.student
      ).length;
      arr.push(solTemp);
    }
    return res.json(arr);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

module.exports = router;
