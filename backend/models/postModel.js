const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    description: {
        type: String,
        max: 500
    },
    
    img: {
        type: String,
    },

    likes: {
        type: Array,
        default: []
    }

}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);