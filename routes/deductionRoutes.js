const express = require('express');
const router = express.Router();
const Deduction = require('../models/Deduction');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const deductionController = require('../controllers/deductionController');

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
router.get('/googlelogout',isAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
  });
// Middleware to check if the user is authenticated
router.use(isAuthenticated);
*/
// Get all deductions
router.get('/showdeductions', adminauthorized,deductionController.showDeductions);
//get one 
router.get('/showdeduction/:deductionId', adminauthorized,deductionController.getoneDeduction);

// Admin - Create a Deduction
router.post('/create', adminauthorized,deductionController.createDeduction);

// Admin - Update a Deduction
router.patch('/edit/:deductionId', adminauthorized,deductionController.updateDeduction);

// Admin - Delete a Deduction
router.delete('/delete/:deductionId', adminauthorized,deductionController.deleteDeduction);

module.exports = router;
