import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import CalcNutritions from "../../helpers/calcNutritions";

export default function Day(props) {
  const initialMeals = {
    breakfast: '',
    lunch: '',
    dinner: ''
  }
  const initialNutritions = {
    calories: 0,
    carbohydrates:  0,
    fat: 0,
    fiber:  0,
    protein:  0,
    sugar:  0,
  }
  const [nutritions, setNutritions] = useState(initialNutritions);
  const [meals, setMeals] = useState(initialMeals);
  const [mealsNames, setMealsNames] = useState(initialMeals);
  
  function setToLocalStorage(meal){
    let existing = localStorage.getItem(props.date);
    if(existing){
      localStorage.removeItem(props.date);
    }
    localStorage.setItem(props.date, JSON.stringify(meal));
  };

  function handleChange(e) {
    const {name} = e.target;
    const {id, recipe} = JSON.parse(e.target.value);
    setMeals({ ...meals, [name]: id });
    setMealsNames({...mealsNames, [name]: recipe})
    setToLocalStorage({ ...meals, [name]: id });
  };

  // filters meal by id and set nutritions of this meal to the summary
  function filterMealsByID(){
    let filteredMeals = props.recipes
      .filter(recipe => recipe.id == meals.breakfast || recipe.id == meals.lunch || recipe.id == meals.dinner);
    const calculatedNutritons = CalcNutritions(filteredMeals);
    setNutritions(calculatedNutritons);
    filteredMeals.map(m => {
      setMealsNames({...mealsNames, [m.type]: m.name})
    })
  };
  
  useEffect(() => {
    let existing = localStorage.getItem(props.date);
    if(existing){
      setMeals(JSON.parse(existing)); 
    }
    filterMealsByID();
  }, []);

  useEffect(() => {
    filterMealsByID();
  }, [meals]);
  
  
  return (
      <div>
        <DayBox>
          <DayText>{props.day}</DayText>
          <DayDate>{props.date}</DayDate>
        </DayBox>
        <Dish key={uuidv4()}>
            <Select name='breakfast' onChange={handleChange}>
                <option value={meals.breakfast}>{mealsNames.breakfast}</option>
                {props.options.breakfast.map(recipe => (
                  <option key={uuidv4()} value={JSON.stringify({id:recipe.id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>
        <Dish key={uuidv4()}>
            <Select name='lunch' onChange={handleChange}>
              <option value={meals.lunch}>{mealsNames.lunch}</option>
                {props.options.lunch.map(recipe => (
                  <option key={uuidv4()} value={JSON.stringify({id:recipe.id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>
        <Dish key={uuidv4()}>
            <Select name='dinner' onChange={handleChange}>
              <option value={meals.dinner}>{mealsNames.dinner}</option>
                {props.options.dinner.map(recipe => (
                  <option key={uuidv4()} value={JSON.stringify({id:recipe.id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>

        <Summary>
          <p>calories: {nutritions.calories}</p>
          <p>carbo: {nutritions.carbohydrates}</p>
          <p>fat: {nutritions.fat}</p>
          <p>sugar: {nutritions.fiber}</p>
          <p>fiber: {nutritions.sugar}</p>
          <p>protein: {nutritions.protein}</p>
        </Summary>
      </div>
  );
}


const DayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const DayText = styled.span`
  width: 100%;
  text-align: center;
`;

const DayDate = styled.span`
  width: 100%;
  text-align: center;
  font-size: 0.75em;
`;

const Dish = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 100px;
  border: 1px solid black;
`;

const Select = styled.select`
  height: 100%;
  width: 100%;
  border:none;
  background: #f5f7fa;
`;

const Summary = styled.div`
  display: gird;
  grid-template-columns: 1fr 1fr;
  height: 100px;
  border: 1px solid black;
  & p {
    font-size:10px;
    width:100%;
    margin-left:5px;
  }
`;


