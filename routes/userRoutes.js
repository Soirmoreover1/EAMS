const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const customerError = require("../CustomerError");

const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
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


// User registration
router.post('/register',upload.single('image') , async (req, res) => {
    try {
    
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    const user=new User(req.body)
    const token = await user.generateAuthToken()

    await user.save();
    res.status(201).send({user,token}).json({user,token});
  } catch (error) {
    res.status(500).json({ message:error.message });
  }
});




router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const finduser = await User.findOne({ email });

  if (!finduser) {
    next(
      customerError({
        statusCode: 401,
        message: "password or email is not correct",
      })
    );
  }
  const copmarpass = await bcrypt.compare(password, finduser.password);
  if (copmarpass) {
    const token = await finduser.generateAuthToken();
    res.status(200).send(token).json(token); 
}
next(
  customerError({
    statusCode: 401,
    message: "password or email is not correct",
  })
);
});

router.post('/logout', async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await user.save();
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;