const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  slug: {
    type: String,
    required: [true, "Please add a slug"],
  },
  id: {
    type: Number,
    required: [true, "Please add a id"],
  },
  ingredients: {
    type: Array,
    required: [true, "Please add a ingredient"],
  },
  instructions: {
    type: Array,
    required: [true, "Please add a instructions"],
  },
  cooking_time: {
    type: Number,
    required: [true, "Please add a cooking time"],
  },
  calories: {
    type: Number
  },
  type: {
    type: String,
    required: [true, "Please add a type of meal"],
  },
  img_url: {
    type: String,
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
