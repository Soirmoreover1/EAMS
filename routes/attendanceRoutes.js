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
/*
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
*/
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