
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const customerError = require("../CustomerError");
const crypto = require('crypto');
const nodemailer = require('nodemailer') ;
const {authorized , adminauthorized} = require('../middlewares/authenticate');
const userController = require('../controllers/userController');
require('dotenv').config();

const utli = require('util');
const asyncsign = utli.promisify(jwt.sign);

const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
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
    const user = await User.findOne({ email })

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
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  
  const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now
  
      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
      await user.save();
  
      const resetLink = 'https://yourapp.com/reset-password?token=${resetToken}';
      const mailOptions = {
        from:  process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        html: '<p>Click the following link to reset your password: <a href="' + resetLink + '">' + resetLink + '</a></p>',
            };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Failed to send reset email' });
        }
        res.json({ message: 'Reset email sent successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
   


module.exports = {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword
};