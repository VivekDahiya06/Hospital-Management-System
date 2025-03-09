const mongoose = require('mongoose');

const doctor_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});