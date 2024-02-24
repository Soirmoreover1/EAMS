const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config();
const {authorized , adminauthorized} = require('../middlewares/authenticate');

const showPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const showPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.promotionId);

    if (!promotion) {
      return res.status(404).json({ message: 'promotion not found.' });
    }

    res.json(promotion);
  } catch (error) {
    console.error('Error getting promotion details:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
};

const createPromotion = async (req, res) => {
  try {
    const { promotionDate, newDepartment, newPosition, newSalary } = req.body;
    const emp_id = req.user.id;

    const promotion = new Promotion({
      emp_id,
      company :req.user.company,
      promotionDate,
      newDepartment,
      newPosition,
      newSalary
    });

    await promotion.save();
    res.status(201).json({ message: 'Promotion created.', promotion });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const updatePromotion = async (req, res) => {
  try {
    await Promotion.findByIdAndUpdate(req.params.promotionId, req.body);

    res.json({ message: 'Promotion updated.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

const deletePromotion = async (req, res) => {
  try {
    await Promotion.findByIdAndDelete(req.params.promotionId);
    res.json({ message: 'Promotion deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.' });
  }
};

module.exports = {
  showPromotions,
  showPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion
};