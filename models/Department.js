const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref :"User", required: false },
    company_id:{type: mongoose.Schema.Types.ObjectId, ref :"Company", required: false},
});

module.exports = mongoose.model('Department', departmentSchema);