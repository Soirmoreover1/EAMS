const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee_personal_info');
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



// Get all Employee
router.get('/showemployees',adminauthorized ,async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Create a Employee
router.post('/create',adminauthorized,upload.single('image') ,async (req, res) => {
  try {
    const employee = new Employee({
      emp_id: req.body.emp_id,
      employeeType: req.body.employeeType,
      shift: req.body.shift,
      name:req.body.name,
      hiringDate:req.body.hiringDate,
      department: req.body.department,
      role: req.body.role,
      image: req.file.filename,
      mobileNumber:req.body.mobileNumber,
      salary: req.body.salary,
      salaryType: req.body.salaryType,
      address: req.body.address,
      otherDetails: req.body.otherDetails,
      workingDays: req.body.workingDays,
      isActive:req.body.isActive

    });

    await employee.save();
    res.status(201).json({ message: 'Employee created.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Update a Employee
router.patch('/edit/:employeeId',adminauthorized, async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.employeeId, req.body);
  
    res.json({ message: 'Employee updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

// Admin - Delete a Employee
router.delete('/delete/:employeeId', adminauthorized, async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.employeeId);
    res.json({ message: 'Employee deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
});

module.exports = router;