const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const companyController = require('../controllers/companyController');
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
router.get('/googlelogout', isAuthenticated,(req, res) => {
    req.logout();
    res.redirect('/');
  });
// Middleware to check if the user is authenticated
router.use(isAuthenticated);

// Get all companies
router.get('/showcompanies',adminauthorized,companyController.showCompanies);
//get one company
router.get('/showcompany/:companyId',adminauthorized,companyController.showCompany);

// Admin - Create a Company
router.post('/create',adminauthorized ,companyController.createCompany);

// Admin - Update a Company
router.patch('/edit/:companyId',adminauthorized ,companyController.updateCompany);

// Admin - Delete a Company
router.delete('/delete/:companyId', adminauthorized,companyController.deleteCompany);

module.exports = router;
