const mongoose = require('mongoose');
//const Departments = require('./Department');

const companySchema = new mongoose.Schema({
  
name: { type: String,
    match: [/^[a-zA-Z ]{2,30}$/, 'Please enter a valid name should be string more than 3 letter.'],
    required: true },
manager: { type: String,
    match: [/^[a-zA-Z ]{2,30}$/, 'Please enter a valid name should be string more than 3 letter.'],
    required: true },
taxId: { type: String, required: true },
website: { type: String, required: true },
//location: {
  //  type: {
  //    type: String,
  //    required: false
  //  },
  //  coordinates:[] 
  //},
industry: { type: String, required: true },
departements:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
employee_personal_infos:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee_personal_info' }],
attendances:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
shifts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
promotions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' }],
salarys:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Salary' }],
leaves:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Leave' }],
deductions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Deduction' }],
bonuses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Bonus' }],

creator:{

    type:mongoose.Types.ObjectId,
    ref:"User"
}

});

companySchema.index({location:'2dsphere'});
module.exports = mongoose.model('Company', companySchema);
