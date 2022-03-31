const asyncHandler = require('express-async-handler');

const Dish = require('../models/dishModel');

// @desc Get dish
// @route GET /api/dish
// @access Private
const getDishes = asyncHandler(async (req, res) => {
    const dishes = await Dish.find()

    res.json(dishes)
});

// @desc Set dish
// @route POST /api/dish
// @access Private
const setDish = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.stats(400).json({ message: 'please add a text field'})
        throw new Error('Please add a text field')
    }

    const dish = await Dish.create({
        text: req.body.text
    })

    res.json(dish)
});

// @desc Update dish
// @route PUT /api/dish
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
// @route DELETE /api/dish
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