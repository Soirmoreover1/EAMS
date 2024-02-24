const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');


const showUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const showUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'user not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error getting user details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const showDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const showDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);

    if (!department) {
      return res.status(404).json({ message: 'department not found.' });
    }

    res.json(department);
  } catch (error) {
    console.error('Error getting department details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { name, manager } = req.body;
    const emp_id = req.user.id;
    const department = new Department({
      company :req.user.company,
      name,
      manager
    });

    await department.save();
    res.status(201).json({ message: 'Department created.', department });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const updateDepartment = async (req, res) => {
  try {
    await Department.findByIdAndUpdate(req.params.departmentId, req.body);

    res.json({ message: 'Department updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.departmentId);
    res.json({ message: 'Department deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  showUsers,
  deleteUser,
  showUser,
  showDepartments,
  showDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
};