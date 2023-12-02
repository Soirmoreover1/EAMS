const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');


// Get all Attendance
router.get('/showattendances',adminauthorized ,async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Create a attendances
router.post('/create',adminauthorized, async (req, res) => {
  try {
    const attendance = new Attendance({
      
    attendanceDate:req.body.attendanceDate ,
    type: req.body.type,
    loans: req.body.loans,
    Deduction:req.body.Deduction,
    bonusAmount:req.body.bonusAmount 
      
    });

    await attendance.save();
    res.status(201).send(attendance).json({ message: 'Attendance created.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Update a Attendance
router.patch('/edit/:attendanceId',adminauthorized, async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(req.params.attendanceId, req.body);
  
    res.json({ message: 'Attendance updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Delete a Attendance
router.delete('/delete/:attendanceId', adminauthorized, async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.attendanceId);
    res.json({ message: 'Attendance deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;