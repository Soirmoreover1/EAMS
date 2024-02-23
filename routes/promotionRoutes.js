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