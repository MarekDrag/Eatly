const express = require('express');
const router = express.Router();
const { getRecipes, getRecipe, setRecipes, updateRecipes, deleteRecipes } = require('../controllers/recipeController');


router.get('/', getRecipes);

router.get('/:id', getRecipe);

router.post('/', setRecipes);

router.patch('/:id', updateRecipes);

router.delete('/:id', deleteRecipes);



module.exports = router;