const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: Number,
        default: '0'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    agreement: {
        type: String,
        required: true
    },
    userPicture: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
    }
  
}, {timestamps: true}
);

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;
