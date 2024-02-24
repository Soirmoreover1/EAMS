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