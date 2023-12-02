const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, ref :"User", required: true },
    attendanceDate: { type: Date, required: true },
    type: { type: String, enum: ['Present', 'Absent', 'Half-day', 'Holiday'], required: true },
    loans: { type: Number, default: 0 },
    Deduction: { type: Number, default: 0 },
    bonusAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Attendance', attendanceSchema);