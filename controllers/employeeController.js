const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee_personal_info');
const employeeController = require('../controllers/employeeController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const bodyparser = require("body-parser");
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended:true}));  
const multer =require("multer")
const path =require("path")
router.use(express.static('public'))
const storage = multer.diskStorage({
destination:function(req,file,cb){
  cb(null,path.join(__dirname,'../public/userImages'),function(error,sucess){
    if(error) throw error
  });
},
filename:function(req,file,cb){
  const name = Date.now()+'-'+file.originalname;
  cb(null,name,function(error1,success1){
    if(error1) throw error1
  })
}
});

const upload =multer({storage:storage});
//all employees
const showEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

//one employee id
const showEmployee= async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Error getting employee details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};



const createEmployee = async (req, res) => {
  try {
    // Check if the required fields are present in the request body
    const requiredFields = [
      'employeeType',
      'name',
      'role',
      'department',
      'shift',
      'mobileNumber',
      'salary',
      'salaryType',
      'address',
      'otherDetails',
      'workingDays',
      'isActive'
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Missing required fields', missingFields });
    }

    const employee = new Employee({
      ...req.body,
      image: req.file ? req.file.filename : null
    });

    await employee.save();
    console.log('Employee created:', employee);
    res.status(201).json({ message: 'Employee created.', employee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.employeeId, req.body);
    res.json({ message: 'Employee updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.employeeId);
    res.json({ message: 'Employee deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' , error: error.message});
  }
};

module.exports = {
  showEmployees,
  showEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};