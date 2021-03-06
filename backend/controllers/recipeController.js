const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipeModel");

// @desc Get all recipes
// @route GET /api/recipes
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find();

  res.json(recipes);
});

// @desc Get one recipe
// @route GET /api/recipes/:id
const getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  res.json(recipe);
});



// @desc Set recipe
// @route POST /api/recipes
const setRecipes = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "please add a text field" });
    throw new Error("Please add a text field");
  }

  const name = req.body.name;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;
  const cooking_time = req.body.cooking_time;
  const type = req.body.type;
  const price = req.body.price;
  const calories = req.body.calories;
  const img_url = req.body.img_url;

  const newRecipe = new Recipe({
    name,
    ingredients,
    instructions,
    cooking_time,
    calories,
    type,
    price,
    calories,
    img_url
  });

  newRecipe.save()
    .then(() => res.json("Recipe added!"))
    .catch((err) => res.status(400).json("Erro: " + err));
});

// @desc Update recipe
// @route PUT /api/recipes
const updateRecipes = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error("Recipe not found");
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedRecipe);
});

// @desc Delete recipe
// @route DELETE /api/recipes
const deleteRecipes = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error("Recipe not found");
  }

  await recipe.remove();

  res.json({ id: req.params.id });
});

module.exports = {
  getRecipes,
  getRecipe,
  setRecipes,
  updateRecipes,
  deleteRecipes,
};
