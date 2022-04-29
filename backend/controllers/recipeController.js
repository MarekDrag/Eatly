const asyncHandler = require('express-async-handler');

const Recipe = require('../models/recipeModel');

// @desc Get recipe
// @route GET /api/recipes
// @access Private
const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find()

    res.json(recipes)
});

// @desc Set recipe
// @route POST /api/recipes
// @access Private
const setRecipes = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400).json({ message: 'please add a text field'})
        throw new Error('Please add a text field')
    }
    
    const name = req.body.name;
    const ingredient = req.body.ingredient;
    const instructions = req.body.instructions;
    const cooking_time = req.body.cooking_time;
    const tags = req.body.topics;
    const img_url = req.body.img_url;
            
    
    const newRecipe = new Recipe({
            name,
            ingredient,
            instructions,
            cooking_time,
            tags,
            img_url,
    });

    newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

// @desc Update recipe
// @route PUT /api/recipes
// @access Private
const updateRecipes = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
        res.status(400);
        throw new Error('Dishes not found');
    };

    const updatedRecipe = await Dish.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.json(updatedRecipe)
});

// @desc Delete recipe
// @route DELETE /api/recipes
// @access Private
const deleteRecipes = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
        res.status(400);
        throw new Error('Recipes not found');
    };

    await recipe.remove();


    res.json({ id: req.params.id })
});

module.exports = {
    getRecipes, 
    setRecipes, 
    updateRecipes, 
    deleteRecipes
};