const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const leaveController = require('../controllers/leaveController');
const { passport, isAuthenticated } = require('../middlewares/auth'); // Import Passport and isAuthenticated

// Use Passport for Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page or a designated route
    res.redirect('/');
  }
);
router.get('/googlelogout',isAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
  });
// Middleware to check if the user is authenticated
router.use(isAuthenticated);
// Get all Leave
router.get('/showleaves', adminauthorized, leaveController.showLeaves);

//get one employee
router.get('/leave/:leaveId', adminauthorized,leaveController.showLeave);
// Admin - Create a Leave
router.post('/create', adminauthorized ,leaveController.createLeave);

// Admin - Update a Leave
router.patch('/edit/:leaveId', adminauthorized, leaveController.updateLeave);

// Admin - Delete a Leave
router.delete('/delete/:leaveId',  adminauthorized, leaveController.deleteLeave);

module.exports = router;