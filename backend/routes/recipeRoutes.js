const express = require('express');
const router = express.Router();
const { getRecipes, setRecipes, updateRecipes, deleteRecipes } = require('../controllers/recipeController');


router.get('/', getRecipes);

router.post('/', setRecipes);

router.put('/:id', updateRecipes);

router.delete('/:id', deleteRecipes);



module.exports = router;