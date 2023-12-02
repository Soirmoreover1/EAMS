const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

// Get all Shift
router.get('/showshifts',adminauthorized ,async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Create a Shift
router.post('/create',adminauthorized, async (req, res) => {
  try {
    const shift = new Shift({
        shiftName: req.body.shiftName,
      startTime:  req.body.startTime,
      endTime: req.body.endTime
    });

    await shift.save();
    res.status(201).send(shift).json({ message: 'Shift created.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Update a Shift
router.patch('/edit/:shiftId',adminauthorized, async (req, res) => {
  try {
    await Shift.findByIdAndUpdate(req.params.shiftId, req.body);
  
    res.json({ message: 'Shift updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Delete a Shift
router.delete('/delete/:shiftId', adminauthorized, async (req, res) => {
  try {
    await Shift.findByIdAndDelete(req.params.shiftId);
    res.json({ message: 'Shift deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;