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