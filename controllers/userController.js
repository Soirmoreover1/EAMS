
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const customerError = require("../CustomerError");
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const userController = require('../controllers/userController');

const utli = require('util');
const asyncsign = utli.promisify(jwt.sign);

const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email }).populate({  path: 'tokens',
    model: 'User'});
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate({  path: 'tokens',
    model: 'User'})

    if (!user) {
      return next(
        customerError({
          statusCode: 401,
          message: 'Email or password is not correct.',
        })
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(
        customerError({
          statusCode: 401,
          message: 'Email or password is not correct.',
        })
      );
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ message :'User logged in successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    // Retrieve the token from the request headers or cookies
    const token = req.headers.authorization || req.cookies.token;

    // Set the token's expiration to an earlier date to invalidate it
    // For example, you can set it to one second ago
    const expirationDate = new Date(Date.now() - 1000);

    // Sign a new token with the updated expiration date
    const invalidatedToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: '1s',
      subject: token,
    });

    // Set the invalidated token as the new token in the response headers or cookies
    res.set('Authorization', invalidatedToken);
    res.cookie('token', invalidatedToken);
    res.json({ message: 'User logged out successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }};
  
   


module.exports = {
  register,
  login,
  logout
};