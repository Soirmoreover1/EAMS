
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const Salary = require('../models/Salary');

// Controller method for getting all salaries
exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.json(salaries);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

exports.getoneSalary = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.salaryId);

    if (!salary) {
      return res.status(404).json({ message: 'salary not found.' });
    }

    res.json(salary);
  } catch (error) {
    console.error('Error getting salary details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};
// Controller method for creating a salary
exports.createSalary = async (req, res) => {
  try {
    const emp_id = req.user.id;

    const salary = new Salary({
      company :req.user.company,
      gross_salary: req.body.gross_salary,
      new_salary: req.body.new_salary,
      date: req.body.date
    });

    await salary.save();
    res.status(201).json({ message: 'Salary created.', salary });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Controller method for updating a salary
exports.updateSalary = async (req, res) => {
  try {
    await Salary.findByIdAndUpdate(req.params.salaryId, req.body);
  
    res.json({ message: 'Salary updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

// Controller method for deleting a salary
exports.deleteSalary = async (req, res) => {
  try {
    await Salary.findByIdAndDelete(req.params.salaryId);
    res.json({ message: 'Salary deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};