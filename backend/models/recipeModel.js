const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  ingredients: {
    type: Array,
    required: [true, "Please add ingredient"],
  },
  instructions: {
    type: Array,
    required: [true, "Please add instructions"],
  },
  cooking_time: {
    type: Number,
    required: [true, "Please add cooking time"],
  },
  type: {
    type: String,
    required: [true, "Please add type of meal"],
  },
  price: {
    type: Number,
    required: [true, "Please add price"],
  },
  calories: {
    type: Number,
    required: [true, "Please add calories"],
  },
  img_url: {
    type: String,
    required: [true, "Please add price"],
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
