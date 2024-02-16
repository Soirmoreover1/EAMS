const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  shiftName: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  working_days:{type:String,required:true},
});

module.exports = mongoose.model('Shift', shiftSchema);