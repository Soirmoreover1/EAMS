const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  emp_id: { type: mongoose.Schema.Types.ObjectId, ref :"User", required: false },
  gross_salary: { type:Number, required: true },
  new_salary: { type:Number, required: true },
  date: {type: Date,default:Date.now ,required: false},
});

module.exports = mongoose.model('Salary', salarySchema);