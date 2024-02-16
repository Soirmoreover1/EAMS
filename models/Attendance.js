const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, ref :"User", required: false },
    attendanceDate: { type: Date,default:Date.now ,required: false },
    type: { type: String, enum: ['Present', 'Absent', 'Half-day', 'Holiday'], required: true },
    time_in:{type:String, required:true},
    time_out:{type:String, required:true},
    total_hours_worked:{type:String, required:true},
    overtime_hours:{type:String,required:true},
});

module.exports = mongoose.model('Attendance', attendanceSchema);