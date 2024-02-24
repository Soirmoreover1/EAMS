const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const { passport, isAuthenticated } = require('../middlewares/auth'); // Import Passport and isAuthenticated
const attendanceController = require('../controllers/attendanceController');

// Get all attendances
router.get('/showattendances', adminauthorized,isAuthenticated, attendanceController.showAttendances);
//get one
router.get('/showattendance/:attendanceId', adminauthorized ,isAuthenticated, attendanceController.showAttendance);

// Admin - Create an attendance
router.post('/create', adminauthorized ,isAuthenticated,attendanceController.createAttendance);

// Admin - Update an attendance
router.patch('/edit/:attendanceId', adminauthorized, isAuthenticated, attendanceController.updateAttendance);

// Admin - Delete an attendance
router.delete('/delete/:attendanceId', adminauthorized,isAuthenticated, attendanceController.deleteAttendance);

module.exports = router;