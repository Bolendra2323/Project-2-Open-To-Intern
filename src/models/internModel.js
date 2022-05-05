const mongoose = require('mongoose');

const internSchema = new mongoose.Schema(
    {
        name :  {
                    type: String,
                    required: true,
                    trim: true
                },
        email : {
                    type: String,
                    required: true,
                    unique: true,
                    lowerCase: true
                },
        mobile : {
                    type: String,
                    required: true,
                    unique: true
                },
        collegeId : {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'colleges',
                        required: true
                    },
        isDeleted : {
                        type: Boolean,
                        default: false
                    }
    }
);

module.exports = mongoose.model('interns', internSchema);