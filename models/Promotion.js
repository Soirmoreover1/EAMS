const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    emp_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    promotionDate: { type: Date, required: true },
    newDepartment: { type: String, required: true },
    newPosition: { type: String, required: true },
    newSalary: { type: Number, required: true },
});

module.exports = mongoose.model('Promotion', promotionSchema);