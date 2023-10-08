// /models/PatientProfile.js

const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  medicalHistory: { type: String },
  // Add more fields as needed for patient information
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the doctor

});

module.exports = mongoose.model('PatientProfile', patientProfileSchema);
