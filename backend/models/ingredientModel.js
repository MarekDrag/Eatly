const mongoose = require('mongoose');


const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    calories: {
        type: Number
    },
    measure: {
        type: String
    },
    price: {
        type: Number
    }
});

            

module.exports = mongoose.model('Ingredient', ingredientSchema);