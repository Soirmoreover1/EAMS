const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

const showCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
    .populate('departments')
    .populate('deductions')
    .populate('shifts')
    .populate('bonuses')
    .populate('employee_personal_infos')
    .populate('attendances')
    .populate('promotions')
    .populate('salaries')
    .populate('leaves')
    .populate('creator')
  
    res.json(companies);

  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const showCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId)
    .populate('departments')
    .populate('deductions')
    .populate('shifts')
    .populate('bonuses')
    .populate('employee_personal_infos')
    .populate('attendances')
    .populate('promotions')
    .populate('salaries')
    .populate('leaves')
    .populate('creator');

    if (!company) {
      return res.status(404).json({ message: 'company not found.' });
    }

    res.json(company);

  } catch (error) {
    console.error('Error getting company details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};


const createCompany = async (req, res) => {
  try {
    const requiredFields = [
       'name',
        'manager',
        'taxId',
        'website',
        'industry' 
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Missing required fields', missingFields });
    }
    const company = new Company({
      ...req.body
    });

    await company.save();
    res.status(201).json({ message: 'Company created.', company });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const updateCompany = async (req, res) => {
  try {
    await Company.findByIdAndUpdate(req.params.companyId, req.body);

    res.json({ message: 'Company updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.companyId);
    res.json({ message: 'Company deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  showCompanies,
  showCompany,
  createCompany,
  updateCompany,
  deleteCompany
};