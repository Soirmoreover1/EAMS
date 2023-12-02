const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

// Get all Promotion
router.get('/showpromotions',adminauthorized ,async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Create a Promotion
router.post('/create',adminauthorized, async (req, res) => {
  try {
    const promotion = new Promotion({
    
    emp_id: req.body.emp_id,
    promotionDate:  req.body.promotionDate,
    newDepartment: req.body.newDepartment,
    newPosition:  req.body.newPosition,
    newSalary:  req.body.newSalary

    });

    await promotion.save();
    res.status(201).send(promotion).json({ message: 'Promotion created.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Update a Promotion
router.patch('/edit/:promotionId',adminauthorized, async (req, res) => {
  try {
    await Promotion.findByIdAndUpdate(req.params.promotionId, req.body);
  
    res.json({ message: 'Promotion updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Delete a Promotion
router.delete('/delete/:promotionId', adminauthorized, async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.promotionId);
    res.json({ message: 'Promotion deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;