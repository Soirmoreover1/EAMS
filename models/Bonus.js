const mongoose = require('mongoose');

const bonusSchema = new mongoose.Schema({
  emp_id: { type: mongoose.Schema.Types.ObjectId, ref :"User", required: false },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  type_of_bonus: { type: String, enum: ['patient', 'normal','order'], required: true},
  bonus_amount: { type:Number, required: true },
  date: {type: Date,default:Date.now ,required: false},
});

module.exports = mongoose.model('Bonus', bonusSchema);