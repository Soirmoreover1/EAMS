const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    promotionDate: { type: Date,default:Date.now, required: false },
    prePosition: { type: String, required: true },
    newPosition: { type: String, required: true },
    salary_increase: { type: Number, required: true },
});

module.exports = mongoose.model('Promotion', promotionSchema);