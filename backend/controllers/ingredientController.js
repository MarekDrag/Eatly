const Ingredient = require('../models/ingredientModel');

// @desc Get user
// @route GET /api/users
// @access Private
const getIngredient = async(req, res) => {
    const ingredients = await Ingredient.find()
    
    
    res.json(ingredients)
};

// @desc Set user
// @route POST /api/users
// @access Private
const setIngredient = async (req, res) => {
    if(!req.body) {
        res.status(400).json({ message: 'please add a text field'})
        throw new Error('Please add a text field')
    }
    
    const name = req.body.name;
    const id = req.body.id;
    const calories = req.body.calories;
    const measure = req.body.measure;
    const price = req.body.price;
            
    
    const newIngredient = new Ingredient({
            name,
            id,
            calories,
            measure,
            price
    });

    newIngredient.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
};

// @desc Update user
// @route PUT /api/users
// @access Private
const updateIngredient = async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.id);

    if(!ingredient) {
        res.status(400);
        throw new Error('Ingredient not found');
    };

    const updatedIngredient = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.json(updatedIngredient)
};

// @desc Delete user
// @route DELETE /api/users
// @access Private
const deleteIngredient = async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.id);

    if(!ingredient) {
        res.status(400);
        throw new Error('Ingredient not found');
    };

    await ingredient.remove();


    res.json({ id: req.params.id })
};

module.exports = {
    getIngredient, 
    setIngredient, 
    updateIngredient, 
    deleteIngredient 
};