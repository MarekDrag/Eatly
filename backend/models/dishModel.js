const mongoose = require('mongoose');


const dishSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
});

module.exports = mongoose.model('Dish', dishSchema);