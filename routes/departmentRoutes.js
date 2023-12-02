const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
// get all users
router.get('/showusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

//delete users by id
router.delete('/users/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Get all department
router.get('/showdepartments',async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Create a department
router.post('/create', async (req, res) => {
  try {
    const department = new Department({
      name: req.body.name,
      manager: req.body.manager
      
    });

    await department.save();
    res.status(201).send(department).json({ message: 'department created.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Update a department
router.patch('/edit/:departmentId', async (req, res) => {
  try {
    await Department.findByIdAndUpdate(req.params.departmentId, req.body);
  
    res.json({ message: 'department updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Delete a department
router.delete('/delete/:departmentId', async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.departmentId);
    res.json({ message: 'department deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;