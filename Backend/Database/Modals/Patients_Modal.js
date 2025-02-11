const mongoose = require('mongoose');

const patient_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    symptoms: {
        type: [String],
        default: []
    },
});
