const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');


const showAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const showAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: 'attendance not found.' });
    }

    res.json(attendance);
  } catch (error) {
    console.error('Error getting attendance details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};
const createAttendance = async (req, res) => {
  try {
    const { attendanceDate, type, loans, Deduction, bonusAmount } = req.body;

    const attendance = new Attendance({
      attendanceDate,
      type,
      loans,
      Deduction,
      bonusAmount
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance created.', attendance });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(req.params.attendanceId, req.body);

    res.json({ message: 'Attendance updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.attendanceId);
    res.json({ message: 'Attendance deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  showAttendances,
  showAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
};