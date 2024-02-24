const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const promotionController = require('../controllers/promotionController');
const { passport, isAuthenticated } = require('../middlewares/auth'); // Import Passport and isAuthenticated

// Get all Promotion
router.get('/showpromotions', adminauthorized, promotionController.showPromotions);

// Get one Promotion
router.get('/showpromotion', adminauthorized, promotionController.showPromotion);


// Admin - Create a Promotion
router.post('/create', adminauthorized, promotionController.createPromotion);

// Admin - Update a Promotion
router.patch('/edit/:promotionId', adminauthorized,promotionController.updatePromotion);

// Admin - Delete a Promotion
router.delete('/delete/:promotionId', adminauthorized,promotionController.deletePromotion);

module.exports = router;