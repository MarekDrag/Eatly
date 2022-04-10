const mongoose = require('mongoose');


const dishSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    slug: {
        type: String,
        required: [true, 'Please add a slug']
    },
    recipe: {
        type: Array,
        required: [true, 'Please add a recipe']
    },
    ingredients: {
        type: Array,
        required: [true, 'Please add a ingredient']
    },
    nutrition: {
        type: Array,
        required: [true, 'Please add a nutrition']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    num_servings: {
        type: Number,
        required: [true, 'Please add a number of servings']
    },
    cooking_time: {
        type: Number,
        required: [true, 'Please add a cooking time']
    },
    topics: {
        type: String,
        required: [true, 'Please add a topics']
    },
    img_url: {
        type: String
    },
    img_alt: {
        type: String
    }
});

            

module.exports = mongoose.model('Dish', dishSchema);