const mongoose = require('mongoose');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.'],
    minlength: [6, 'Email address should have at least 6 characters.'],
    maxlength: [127, 'Email address can have at most 127 characters.']
  },
  firstName:{
   type:String,
   match: [/^[a-zA-Z ]{2,30}$/, 'Please enter a valid firstname should be string more than 3 letter.'],
    minlength: [2, 'lastname should have at least 6 characters.'],
    maxlength: [127, 'firstname can have at most 127 characters.']
  },
  image: { type: String, required: false },
  lastName: { 
    type:String,
    match: [/^[a-zA-Z ]{2,30}$/, 'Please enter a valid firstname should be string than 3 letter.'],
     minlength: [2, 'lastname should have at least 6 characters.'],
     maxlength: [127, 'firstname can have at most 127 characters.']},
  username: { type:String,
     minlength: [2, 'lastname should have at least 6 characters.'],
     maxlength: [127, 'firstname can have at most 127 characters.']},
  password: {
    type:String,
    validate(value) {
      if( value.toLowerCase().includes('password')) {
      throw new Error('password musn\'t contain password')
     }
  }
   /* match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'Password should contain at least 8 characters, including at least one letter and one number.'
    ]*/
  },
  phoneNumber: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.']
  },
  address: String,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  company:[
{
  type:mongoose.Types.ObjectId,
  ref:"Company"
}
  ],
  role: {
    type: String,
    enum:["admin","user"],
    default: "admin"
  }} , {
    toJSON:{
      transform : (doc , retuDoc)=> _.omit(retuDoc , ['__v' , 'password' , 'role'])
    }
  },
  {resetToken : String},
  {resetTokenExpiration : Date},
  { timestamps: true }
  )
  
  userSchema.methods.generateAuthToken = async function () {
    const token = asyncsign({
      id: this.id,
      email: this.email,
      role: this.role,
  }, process.env.JWT_SECRET);
  return token;
 }

 userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const saltRound = 12
    const hashedpassword = await bcrypt.hash(this.password, saltRound)
    this.password = hashedpassword
  }
  })

module.exports = mongoose.model('User', userSchema);