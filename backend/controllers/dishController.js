const asyncHandler = require('express-async-handler');

const Dish = require('../models/dishModel');

// @desc Get dish
// @route GET /api/dishes
// @access Private
const getDishes = asyncHandler(async (req, res) => {
    const dishes = await Dish.find()

    res.json(dishes)
});

// @desc Set dish
// @route POST /api/dishes
// @access Private
const setDish = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400).json({ message: 'please add a text field'})
        throw new Error('Please add a text field')
    }
    
    const name = req.body.name;
    const slug = req.body.slug;
    const ingredient = req.body.ingredient;
    const recipe = req.body.recipe;
    const description = req.body.description;
    const nutrition = req.body.nutrition;
    const num_servings = req.body.num_servings;
    const cooking_time = req.body.cooking_time;
    const topics = req.body.topics;
    const img_url = req.body.img_url;
    const img_alt = req.body.img_alt;
            
    
    const newDish = new Dish({
            name,
            slug,
            ingredient,
            recipe,
            description,
            nutrition,
            num_servings,
            cooking_time,
            topics,
            img_url,
            img_alt
    });

    newDish.save()
        .then(() => res.json('Dish added!'))
        .catch(err => res.status(400).json('Error: ' + err))

});

// @desc Update dish
// @route PUT /api/dishes
// @access Private
const updateDish = asyncHandler(async (req, res) => {
    const dish = await Dish.findById(req.params.id);

    if(!dish) {
        res.status(400);
        throw new Error('Dishes not found');
    };

    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.json(updatedDish)
});

// @desc Delete dish
// @route DELETE /api/dishes
// @access Private
const deleteDish = asyncHandler(async (req, res) => {
    const dish = await Dish.findById(req.params.id);

    if(!dish) {
        res.status(400);
        throw new Error('Dishes not found');
    };

    await dish.remove();


    res.json({ id: req.params.id })
});

module.exports = {
    getDishes,
    setDish,
    updateDish,
    deleteDish
};