const mongoose = require('mongoose');

const patient_Schema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    symptoms: [String]
});

const Patient_Model = mongoose.model('Patient', patient_Schema);

module.exports = { Patient_Model };