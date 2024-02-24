const express = require('express');
const router = express.Router();
const Deduction = require('../models/Deduction');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

const showDeductions = async (req, res) => {
  try {
    const deductions = await Deduction.find();
    res.json(deductions);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};


const getoneDeduction = async (req, res) => {
  try {
    const deduction = await Deduction.findById(req.params.deductionId);

    if (!deduction) {
      return res.status(404).json({ message: 'deduction not found.' });
    }

    res.json(deduction);
  } catch (error) {
    console.error('Error getting deduction details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const createDeduction = async (req, res) => {
  try {
    const requiredFields = [
       'type_of_Deduction',
        'deduction_amount',
         'date'  ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Missing required fields', missingFields });
    }
    const deduction = new Deduction({
      ...req.body
    });

    await deduction.save();
    res.status(201).json({ message: 'Deduction created.', deduction });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const updateDeduction = async (req, res) => {
  try {
    await Deduction.findByIdAndUpdate(req.params.deductionId, req.body);

    res.json({ message: 'Deduction updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const deleteDeduction = async (req, res) => {
  try {
    await Deduction.findByIdAndDelete(req.params.deductionId);
    res.json({ message: 'Deduction deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  showDeductions,
  getoneDeduction,
  createDeduction,
  updateDeduction,
  deleteDeduction
};