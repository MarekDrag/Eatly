const express = require('express');
const router = express.Router();
const { getIngredient, setIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredientController');


router.get('/', getIngredient);

router.post('/', setIngredient);

router.put('/:id', updateIngredient);

router.delete('/:id', deleteIngredient);



module.exports = router;