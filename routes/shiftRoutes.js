const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const shiftController = require('../controllers/shiftController');
const { passport, isAuthenticated } = require('../middlewares/auth'); // Import Passport and isAuthenticated

// Get all Shifts
router.get('/showshifts', adminauthorized ,shiftController.getAllShifts);
//get one Shift
router.get('/showshift/:shiftId', adminauthorized ,shiftController.getoneShift);

// Admin - Create a Shift
router.post('/shifts', adminauthorized, shiftController.createShift);

// Admin - Update a Shift
router.patch('/shifts/:shiftId', adminauthorized, shiftController.updateShift);

// Admin - Delete a Shift
router.delete('/shifts/:shiftId', adminauthorized, shiftController.deleteShift);
module.exports = router;