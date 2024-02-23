const mongoose = require('mongoose');


const employee_personal_infoSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId ,required: false},
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    employeeType: { type: String, enum: ['manager', 'regular'], required: true },
    shift: { type: mongoose.Schema.Types.ObjectId, required: false },
    name: { type: String, required: true },
    hiringDate: { type: Date,default:Date.now, required: true },
    department: { type: mongoose.Schema.Types.ObjectId,required: false },
    role: { type: String, required: true },
    image: { type: String, required: false},
    mobileNumber: { type: String, required: true },
    salary: { type: Number, required: true },
    salaryType: { type: String, enum: ['day', 'monthly','weekly'], required: true },
    address: { type: String, required: true },
    otherDetails: { type: String },
    workingDays: [{ type: String }],
    isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model('Employee_personal_info', employee_personal_infoSchema);