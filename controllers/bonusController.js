const express = require('express');
const router = express.Router();
const Bonus = require('../models/Bonus');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

const showBonuses = async (req, res) => {
  try {
    const bonuses = await Bonus.find();
    res.json(bonuses);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const getoneBonus = async (req, res) => {
  try {
    const bonus = await Bonus.findById(req.params.bonusId);

    if (!bonus) {
      return res.status(404).json({ message: 'bonus not found.' });
    }

    res.json(bonus);
  } catch (error) {
    console.error('Error getting bonus details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const createBonus = async (req, res) => {
  try {
    const requiredFields =  [
       'type_of_bonus',
       'bonus_amount',
        'date' 
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Missing required fields', missingFields });
    }
    const bonus = new Bonus({
      ...req.body
    });

    await bonus.save();
    res.status(201).json({ message: 'Bonus created.', bonus });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const updateBonus = async (req, res) => {
  try {
    await Bonus.findByIdAndUpdate(req.params.bonusId, req.body);

    res.json({ message: 'Bonus updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const deleteBonus = async (req, res) => {
  try {
    await Bonus.findByIdAndDelete(req.params.bonusId);
    res.json({ message: 'Bonus deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  showBonuses,
  getoneBonus,
  createBonus,
  updateBonus,
  deleteBonus
};