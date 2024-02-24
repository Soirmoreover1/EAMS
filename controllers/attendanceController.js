const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Deduction = require('../models/Deduction');
const Bonus = require('../models/Bonus');
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
    const { attendanceDate, type, time_in, time_out, total_hours_worked, overtime_hours } = req.body;

    // Assuming you have access to the employee's ID
    const emp_id = req.user.id; // Get the employee's ID from the authenticated user

    const attendance = new Attendance({
      emp_id,
      company: req.user.company, // Assuming you store the company ID in the user object
      attendanceDate,
      type,
      time_in,
      time_out,
      total_hours_worked,
      overtime_hours,
    });

    await attendance.save();

    // Check the attendance type and create bonus/deduction accordingly
    if (type === 'Present' && total_hours_worked === '8') {
      // Employee attended the whole day, create a bonus
      const bonus = new Bonus({
        emp_id,
        company: req.user.company,
        type_of_bonus: 'normal', // Adjust the bonus type as needed
        bonus_amount: 100, // Adjust the bonus amount as needed
        date: attendanceDate,
      });
      await bonus.save();
    } else if (type === 'Absent') {
      // Employee was absent, create a deduction
      const deduction = new Deduction({
        emp_id,
        company: req.user.company,
        type_of_Deduction: 'absent', // Adjust the deduction type as needed
        deduction_amount: 50, // Adjust the deduction amount as needed
        date: attendanceDate,
      });
      await deduction.save();
    }

    res.status(201).json({ message: 'Attendance created.', attendance });
  } catch (error) {
    console.error('Error creating attendance:', error);
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