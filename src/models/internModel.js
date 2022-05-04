const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        lowerCase: true,
        type: String,
        required: true,
        unique: true,

    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },

    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colleges',
        required: true,
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('intern', internSchema);