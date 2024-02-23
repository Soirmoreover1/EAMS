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

// Get all companies
router.get('/showcompanies',adminauthorized ,companyController.showCompanies);
//get one company
router.get('/showcompany/:companyId',adminauthorized,companyController.showCompany);

// Admin - Create a Company
router.post('/create',adminauthorized ,companyController.createCompany);

// Admin - Update a Company
router.patch('/edit/:companyId',adminauthorized ,companyController.updateCompany);

// Admin - Delete a Company
router.delete('/delete/:companyId', adminauthorized,companyController.deleteCompany);

module.exports = router;
