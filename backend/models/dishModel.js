const mongoose = require('mongoose');


const dishSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    ingredients: {
        type: Array,
        required: [true, 'Please add a ingredients']
    },
    recipe: {
        type: Object,
        required: [true, 'Please add a recipe']
    },
    calories : {
        type: Number,
        required: [true, 'Please add a calories']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
});

module.exports = mongoose.model('Dish', dishSchema);