function CalcNutritions(props){
    let calories = 0;
    props.map(meal => {
      calories += meal.calories;
    });
    return {
      calories
    }
  }

export default CalcNutritions;