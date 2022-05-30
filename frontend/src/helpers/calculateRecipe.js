export default function calculatePriceAndCalories(ingredients, formValues){
  let price = 0;
  let calories = 0;
  for(let i = 0; i<formValues.length; i++){
    const ingredient = ingredients.filter(x => x.name === formValues[i].name)[0];
    price += Math.round(ingredient.price * 100) /100;
    calories += Math.floor(ingredient.calories * formValues[i].quantity);
  }
  return [price,calories];
}
