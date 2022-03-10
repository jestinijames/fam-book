const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    profilePicture: {
        type: String,
        default: ""
    },

    coverPicture: {
        type: String,
        default: ""
    },

    followers: {
        type: Array,
        default:[]   
    },
    
    following: {
        type: Array,
        default:[]   
    },
    description: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    state: {
        type: String,
        max: 50
    },
    country: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1,2,3]
    },
}, { timestamps: true });

module.exports = mongoose.model('Info', infoSchema);