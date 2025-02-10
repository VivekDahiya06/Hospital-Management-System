const mongoose = require('mongoose');

const doctor_Schema = new mongoose.Schema({
    name: String,
    experience: Number,
    gender: String,
    specialization: String,
    location: String,
    image: String
});

const Doctor_Model = mongoose.model('Doctor', doctor_Schema);

module.exports = { Doctor_Model };