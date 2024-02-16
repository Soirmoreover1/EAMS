const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const departmentController = require('../controllers/departmentController');
const Department = require('../models/Department');
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

// Get all users
router.get('/showusers', adminauthorized, departmentController.showUsers);
//get one user

router.get('/showuser/:userId', adminauthorized, departmentController.showUser);

// Delete users by id
router.delete('/deleteuser/:userId', adminauthorized , departmentController.deleteUser);

// Get all departments
router.get('/showdepartments', adminauthorized, departmentController.showDepartments);
//get one 

router.get('/showdepartment/:departmentId', adminauthorized, departmentController.showDepartment);

// Admin - Create a department
router.post('/create', adminauthorized, departmentController.createDepartment);

// Admin - Update a department
router.patch('/edit/:departmentId', adminauthorized, departmentController.updateDepartment);

// Admin - Delete a department
router.delete('/delete/:departmentId', adminauthorized, departmentController.deleteDepartment);

module.exports = router;
