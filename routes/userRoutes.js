const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const customerError = require("../CustomerError");

const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const userController = require('../controllers/userController');

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


// User registration
router.post('/register', upload.single('image'), userController.register);

router.post("/login", userController.login);

router.post('/logout', userController.logout);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/resetpassword', userController.resetPassword);

module.exports = router;