const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Please add a email'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        required: [true, 'Please add a password']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    mealPlan:{
        type: Object
    }
});

            

module.exports = mongoose.model('User', userSchema);