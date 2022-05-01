function CalcNutritions(props){
    let calories = 0;
    let carbohydrates = 0;
    let fat = 0;
    let fiber = 0;
    let protein = 0;
    let sugar = 0;
    props.map(meal => {
      calories += meal.nutrition.calories;
      carbohydrates += meal.nutrition.carbohydrates;
      fat += meal.nutrition.fat;
      fiber += meal.nutrition.fiber;
      protein += meal.nutrition.protein;
      sugar += meal.nutrition.sugar;
    });
    return {
      calories,
      carbohydrates,
      fat,
      fiber,
      protein,
      sugar
    }
  }

export default CalcNutritions;