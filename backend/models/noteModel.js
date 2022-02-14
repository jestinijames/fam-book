const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'   // The type tells it is a pointer to another doc. The ref tells of which doc.
    },
    task: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Task'   // The type tells it is a pointer to another doc. The ref tells of which doc.
    },
    text: {
        type: String,
        required: [true, 'Add a note']
    },
    // The below functionalites are not implemented in this release
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);