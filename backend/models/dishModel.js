const mongoose = require('mongoose');


const dishSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    ingredient: {
        type: Array,
        required: [true, 'Please add a ingredients']
    },
    recipe: {
        type: String,
        required: [true, 'Please add a recipe']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
});

module.exports = mongoose.model('Dish', dishSchema);