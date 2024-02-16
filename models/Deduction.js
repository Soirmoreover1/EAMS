const mongoose = require('mongoose');

const deductionSchema = new mongoose.Schema({
  emp_id: { type: mongoose.Schema.Types.ObjectId, ref :"User", required: false },
  type_of_Deduction: { type: String, enum: ['absent', 'not work','other'], required: true},
  deduction_amount: { type: String, required: true },
  date: { type: Date,default:Date.now ,required: false },

});

module.exports = mongoose.model('Deduction', deductionSchema);