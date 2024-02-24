const express = require('express');
const router = express.Router();
const Bonus = require('../models/Bonus');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const bonusController = require('../controllers/bonusController');

const { passport, isAuthenticated } = require('../middlewares/auth'); // Import Passport and isAuthenticated

// Get all bonuses
router.get('/showbonuses', adminauthorized,isAuthenticated, bonusController.showBonuses);

//get on bonus
router.get('/showbonus/:bonusId', adminauthorized,isAuthenticated,bonusController.getoneBonus);

// Admin - Create a bonus
router.post('/create', adminauthorized, isAuthenticated,bonusController.createBonus);

// Admin - Update a bonus
router.patch('/edit/:bonusId', adminauthorized,isAuthenticated, bonusController.updateBonus);

// Admin - Delete a bonus
router.delete('/delete/:bonusId', adminauthorized,isAuthenticated, bonusController.deleteBonus);

module.exports = router;