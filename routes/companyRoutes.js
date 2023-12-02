const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

// Get all Company
router.get('/showcompanys',adminauthorized ,async (req, res) => {
  try {
    const companys = await Company.find();
    res.json(companys);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Create a Company
router.post('/create' ,async (req, res) => {
  try {
    const company = new Company({
    name: req.body.name,
    manager: req.body.manager,
    taxId: req.body.taxId,
    website: req.body.website,
    location:{
      type:"Point",
      coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
    },
    industry: req.body.industry 
    });

    await company.save();
    res.status(201).json({ message: 'Company created.' });
  } catch (error) {
    res.status(500).send(error.message).json({ message: 'An error occurred.' });
  }
});

// Admin - Update a Company
router.patch('/edit/:companyId',adminauthorized, async (req, res) => {
  try {
    await Company.findByIdAndUpdate(req.params.companyId, req.body);
  
    res.json({ message: 'Company updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Delete a Company
router.delete('/delete/:companyId', adminauthorized, async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.companyId);
    res.json({ message: 'Company deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;