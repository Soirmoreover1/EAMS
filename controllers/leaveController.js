const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

const showLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};


const showLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.leaveId);

    if (!leave) {
      return res.status(404).json({ message: 'leave not found.' });
    }

    res.json(leave);
  } catch (error) {
    console.error('Error getting leave details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const createLeave = async (req, res) => {
  try {
    const requiredFields= [
      'type_of_leave',
     'startTime',
      'endTime',
       'duration'
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Missing required fields', missingFields });
    }

    const leave = new Leave({
      ...req.body
    });

    await leave.save();
    res.status(201).json({ message: 'Leave created.', leave });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const updateLeave = async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.leaveId, req.body);

    res.json({ message: 'Leave updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.leaveId);
    res.json({ message: 'Leave deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  showLeaves,
  showLeave,
  createLeave,
  updateLeave,
  deleteLeave
};