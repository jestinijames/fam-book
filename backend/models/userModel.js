const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        min: 3,
        max:20
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        max: 50,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email!');
            }
        }    
    },

    password: {
        type: String,
        required: true,
    trim: true,
    minlength: 7,
    validate(value) {
        if (value.toLowerCase().includes('password')) 
        {
            throw new Error('Password cannot contain "password" as string!!');
        }
    }
    },

    profilePicture: {
        type: String,
        default: ""
    },


    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);