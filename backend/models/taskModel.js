const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'   // The type tells it is a pointer to another doc. The ref tells of which doc.
    },
    type: {
        type: String,
        required: [true, 'Select a type'],
        enum: ['home', 'work', 'personal', 'family'],
        default: 'personal'
    },
    description: {
        type: String,
        required: [true, 'Add a detailed description']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'started', 'done'],
        default: 'new'
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);