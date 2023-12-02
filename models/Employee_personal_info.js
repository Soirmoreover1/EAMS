const mongoose = require('mongoose');


const employee_personal_infoSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    employeeType: { type: String, enum: ['Manager', 'Regular'], required: true },
    shift: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    hiringDate: { type: Date, required: true },
    department: { type: mongoose.Schema.Types.ObjectId,required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    salary: { type: Number, required: true },
    salaryType: { type: String, enum: ['Per Day', 'Monthly'], required: true },
    address: { type: String, required: true },
    otherDetails: { type: String },
    workingDays: [{ type: String }],
    isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model('Employee_personal_info', employee_personal_infoSchema);