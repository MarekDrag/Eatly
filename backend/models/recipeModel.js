const mongoose = require('mongoose');


const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    instructions: {
        type: Array,
        required: [true, 'Please add a recipe']
    },
    ingredients: {
        type: Array,
        required: [true, 'Please add a ingredient']
    },
    cooking_time: {
        type: Number,
        required: [true, 'Please add a cooking time']
    },
    tags: {
        type: String,
        required: [true, 'Please add a topics']
    },
    img_url: {
        type: String
    }
});

            

module.exports = mongoose.model('Recipe', recipeSchema);