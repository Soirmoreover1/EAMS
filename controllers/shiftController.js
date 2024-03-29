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
const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const getoneShift= async (req, res) => {
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
const createShift = async (req, res) => {
  try {

    const requiredFields=[
      'shiftName',
      'startTime',
      'endTime'
    ];
    
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Missing required fields', missingFields });
    }
    const shift = new Shift({
      ...req.body
    });

    await shift.save();
    res.status(201).json({ message: 'Shift created.', shift });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Controller method for updating a shift
const updateShift = async (req, res) => {
  try {
    await Shift.findByIdAndUpdate(req.params.shiftId, req.body);
  
    res.json({ message: 'Shift updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Controller method for deleting a shift
const deleteShift = async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.shiftId);
    res.json({ message: 'Shift deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  getoneShift,
  getAllShifts ,
  createShift,
  updateShift,
  deleteShift
};