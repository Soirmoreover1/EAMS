const express = require('express');
const router = express.Router();
const Salary = require('../models/Salary');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const salaryController = require('../controllers/salaryController');
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
// Get all Salaries
router.get('/showsalaries', adminauthorized, salaryController.getAllSalaries);
//get one salary
router.get('/showsalary/:salaryId', adminauthorized,salaryController.getoneSalary);

// Admin - Create a Salary
router.post('/create', adminauthorized, salaryController.createSalary);

// Admin - Update a Salary
router.patch('/edit/:salaryId', adminauthorized, salaryController.updateSalary);

// Admin - Delete a Salary
router.delete('/delete/:salaryId', adminauthorized, salaryController.deleteSalary);

module.exports = router;

