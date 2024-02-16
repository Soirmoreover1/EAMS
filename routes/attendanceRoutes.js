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

// Use Passport for Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page or a designated route
    res.redirect('/');
  }
);
router.get('/googlelogout', isAuthenticated,(req, res) => {
    req.logout();
    res.redirect('/');
  });
// Middleware to check if the user is authenticated
router.use(isAuthenticated);

// Get all attendances
router.get('/showattendances', authorized,isAuthenticated, attendanceController.showAttendances);
//get one
router.get('/showattendance/:attendanceId', authorized,isAuthenticated, attendanceController.showAttendance);

// Admin - Create an attendance
router.post('/create', authorized ,isAuthenticated,attendanceController.createAttendance);

// Admin - Update an attendance
router.patch('/edit/:attendanceId', authorized, isAuthenticated, attendanceController.updateAttendance);

// Admin - Delete an attendance
router.delete('/delete/:attendanceId', authorized,isAuthenticated, attendanceController.deleteAttendance);

module.exports = router;