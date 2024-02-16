const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  emp_id: { type: mongoose.Schema.Types.ObjectId, ref :"User", required: false },
  type_of_leave: { type: String, enum: ['patient', 'normal','order'], required: true},
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, required: true },
});

module.exports = mongoose.model('Leave', leaveSchema);