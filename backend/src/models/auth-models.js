const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    mobileNumber: {
        type: String
    },
    address: {
        type: String
    }
});

authSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Auth', authSchema);
