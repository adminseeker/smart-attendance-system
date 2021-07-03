const express = require('express');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

const Room = require('../../models/Room');
const Class = require('../../models/Class');
const Timing = require('../../models/Timing');

const mailer = require('../../mailer/mailer');

const router = express.Router();

/* 
    route : "/api/rooms/",
    desc : "Create a Room",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const room = new Room({
      room_name: req.body.room_name,
    });
    await room.save();
    res.json(room);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id/device",
    desc : "Add device to an existing room by id",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/:id/device', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    if (!req.body.device) {
      return res.json({ msg: 'No device to be added!' });
    }
    let deviceBody = req.body.device.toUpperCase();
    device = { device: deviceBody };
    const check = await Room.find({ devices: device });
    if (check.length !== 0) {
      return res.json({ msg: 'This device id is already registered!' });
    }
    const updated = await Room.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { devices: device } },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id/timing",
    desc : "Add timings to an existing room by id",
    auth : ["Admin"],
    method: "POST"
*/
router.post('/:id/timing', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.json({ msg: 'room not found!' });
    }
    const _class = await Class.findById(req.body.class);
    if (!_class) {
      return res.json({ msg: 'No class found!' });
    }
    const timing = new Timing(req.body);
    await timing.save();
    const toStore = { timing: timing._id };
    const updated = await Room.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { timings: toStore } },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/",
    desc : "Get rooms",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id",
    desc : "Get room by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/:id', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.json({ msg: 'Room not found!' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id/devices",
    desc : "Get devices in a room by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/:id/devices', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found!' });
    }
    res.json(room.devices);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id/timings",
    desc : "Get timings in a room by id",
    auth : ["Admin"],
    method: "GET"
*/

router.get('/:id/timings', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const room = await Room.findById(req.params.id)
      .populate('timings.timing')
      .populate({
        path: 'timings.timing',
        model: 'Timing',
        populate: { path: 'class', model: 'Class', select: '_id class_name' },
      });
    if (!room) {
      return res.json({ msg: 'Room not found!' });
    }
    res.json(room.timings);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/timings/:id",
    desc : "update timings by id",
    auth : ["Admin"],
    method: "PATCH"
*/

router.patch('/timings/:id', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    if (req.body.class) {
      const _class = await Class.findById(req.body.class);
      if (!_class) {
        return res.json({ msg: 'class not found so unable to update!' });
      }
    }
    const updated = await Timing.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.json({ msg: 'updated not found!' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id/name",
    desc : "update room name",
    auth : ["Admin"],
    method: "PATCH"
*/
router.patch('/:id/name', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const updated = await Room.findOneAndUpdate(
      { _id: req.params.id },
      { room_name: req.body.room_name },
      { new: true }
    );
    if (!updated) {
      return res.json({ msg: 'room not found!' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id/device",
    desc : "Delete device by device_id in device",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete('/:id/device', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    let device = { device: req.body.device };
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id, devices: device },
      { $pull: { devices: device } }
    );
    if (!room) {
      return res.status(404).json({ msg: 'Room or device not found!' });
    }
    res.json({ msg: 'device deregistered!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/timings/:id",
    desc : "Delete timng by id in device",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete('/:id1/timings/:id2', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const timing = await Timing.findOneAndDelete({ _id: req.params.id2 });
    if (!timing) {
      return res.status(404).json({ msg: 'timing not found!' });
    }
    let toDelete = { timing: req.params.id2 };
    const room = await Room.findOneAndUpdate(
      { _id: req.params.id1, timings: toDelete },
      { $pull: { timings: toDelete } }
    );
    if (!room) {
      return res.status(404).json({ msg: 'room not found!' });
    }
    res.json({ msg: 'timing deleted!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

/* 
    route : "/api/rooms/:id",
    desc : "Delete room by id",
    auth : ["Admin"],
    method: "DELETE"
*/

router.delete('/:id', auth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(401).json({ msg: 'Authorization denied!' });
    }
    const room = await Room.findOneAndDelete({ _id: req.params.id });
    if (!room) {
      return res.json({ msg: 'Room not found!' });
    }
    res.json({ msg: 'Room deleted!' });
  } catch (error) {
    res.status(500).send('Server Error!');
    console.log(error);
  }
});

module.exports = router;
