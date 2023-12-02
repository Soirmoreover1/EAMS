const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  
name: { type: String,
    match: [/^[a-zA-Z ]{2,30}$/, 'Please enter a valid name should be string more than 3 letter.'],
    required: true },
manager: { type: String,
    match: [/^[a-zA-Z ]{2,30}$/, 'Please enter a valid name should be string more than 3 letter.'],
    required: true },
taxId: { type: String, required: true },
website: { type: String, required: true },
location: {
    type: {
      type: String,
      required: true
    },
    coordinates:[] 
  },
industry: { type: String, required: true }
});

companySchema.index({location:'2dsphere'});
module.exports = mongoose.model('Company', companySchema);