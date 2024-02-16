const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

// Controller method for getting all shifts
exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

exports.getoneShift= async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.shiftId);

    if (!salary) {
      return res.status(404).json({ message: 'shift not found.' });
    }

    res.json(shift);
  } catch (error) {
    console.error('Error getting shift details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

// Controller method for creating a shift
exports.createShift = async (req, res) => {
  try {
    const shift = new Shift({
      shiftName: req.body.shiftName,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    });

    await shift.save();
    res.status(201).json({ message: 'Shift created.', shift });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Controller method for updating a shift
exports.updateShift = async (req, res) => {
  try {
    await Shift.findByIdAndUpdate(req.params.shiftId, req.body);
  
    res.json({ message: 'Shift updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Controller method for deleting a shift
exports.deleteShift = async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.shiftId);
    res.json({ message: 'Shift deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};