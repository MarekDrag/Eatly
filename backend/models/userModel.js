const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Please add a email']
    },
    name: {
        type: String,
        required: [true, 'Please add a email']
    },
    password: {
        type: String,
        min: 8,
        required: [true, 'Please add a email']
    }
});

            

module.exports = mongoose.model('User', userSchema);