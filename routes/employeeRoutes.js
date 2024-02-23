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

const { passport, isAuthenticated } = require('../middlewares/auth'); // Import Passport and isAuthenticated
/*
// Use Passport for Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page or a designated route
    res.redirect('/');
  }
);
router.get('/googlelogout', isAuthenticated,(req, res) => {
  req.logout();
  res.redirect('/');
});
// Middleware to check if the user is authenticated
router.use(isAuthenticated);
*/
// Get all Employee
router.get('/showemployees', adminauthorized ,employeeController.showEmployees);
//get one employee
router.get('/showemployee/:employeeId', adminauthorized,employeeController.showEmployee);
//  - Create a Employee
router.post('/create', upload.single('image'), adminauthorized, isAuthenticated,employeeController.createEmployee);

// - Update a Employee
router.patch('/edit/:employeeId', authorized ,isAuthenticated,employeeController.updateEmployee);

//  - Delete a Employee
router.delete('/delete/:employeeId', authorized,isAuthenticated, employeeController.deleteEmployee);

module.exports = router;
