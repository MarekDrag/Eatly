import React, { useEffect, useState } from "react";
import styled from "styled-components";


export default function Day(props) {
  const initialMeals = {breakfast: '', lunch: '', dinner: ''}
  const [values, setValues] = useState({calories:'', price:''});
  const [mealsID, setMealsID] = useState(initialMeals);
  const [mealsNames, setMealsNames] = useState(initialMeals);
  const na = 'breakfast';
 
  function setToSessionStorage(meal){
    sessionStorage.setItem(props.date, JSON.stringify(meal));
  };

  function handleChange(e) {
    const {name} = e.target;
    const {id, recipe} = JSON.parse(e.target.value);
    setMealsID({ ...mealsID, [name]: id });
    setMealsNames({...mealsNames, [name]: recipe});
    setToSessionStorage({ ...mealsID, [name]: id });
  };

  // addUp calories and price
  function addUp(){
    let price = 0;
    let calories = 0;
    const arr = filterMealsByID(mealsID);
    arr.map(recipe => {
      price = Math.round(recipe.price + price);
      calories += recipe.calories;
    })
    setValues({price, calories});
  }

  function filterMealsByID(id){
    const breakfast = props.options.breakfast.filter(recipe => recipe._id === id.breakfast);
    const lunch = props.options.lunch.filter(recipe => recipe._id === id.lunch);
    const dinner = props.options.dinner.filter(recipe => recipe._id === id.dinner);
    return [...breakfast,...lunch,...dinner];
  }
  
  useEffect(() => {
    let existing = sessionStorage.getItem(props.date);
    if(existing){
      setMealsID(JSON.parse(existing)); 
      const arr = filterMealsByID(JSON.parse(existing));
      let meals = {breakfast: '', lunch:'', dinner:''}
      arr.map(recipe => {
        meals = {...meals, [recipe.type]: recipe.name};
      })
      setMealsNames(meals);
    }
  }, []);

  useEffect(() => {
    addUp();
  }, [mealsID]);
  
  
  return (
      <div>
        <DayBox>
          <DayText>{props.day}</DayText>
          <DayDate>{props.date}</DayDate>
        </DayBox>
        <Dish key={uuidv4()}>
            <BoxType>Śniadanie</BoxType>
            <Select name='breakfast' onChange={e => handleChange(e)}>
                <option value={mealsID.breakfast}>{mealsNames.breakfast.toLocaleUpperCase()}</option>
                {props.options[na].map(recipe => (
                  <option key={uuidv4()} value={JSON.stringify({id:recipe._id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>
        <Dish key={uuidv4()}>
            <BoxType>Obiad</BoxType>
            <Select name='lunch' onChange={e => handleChange(e)}>
                <option value={mealsID.breakfast}>{mealsNames.lunch.toLocaleUpperCase()}</option>
                {props.options.lunch.map(recipe => (
                  <option key={uuidv4()} value={JSON.stringify({id:recipe._id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>
        <Dish key={uuidv4()}>
            <BoxType>Kolacja</BoxType>
            <Select name='dinner' onChange={e => handleChange(e)}>
              <option value={mealsID.dinner}>{mealsNames.dinner.toLocaleUpperCase()}</option>
                {props.options.dinner.map(recipe => (
                  <option key={uuidv4()} value={JSON.stringify({id:recipe._id, recipe:recipe.name})}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>

        <Values>
          <p>Kalorie: {values.calories}</p>
        </Values>
        <Values>
          <p>Cena za dzień: {values.price} zł</p>
        </Values>
      </div>
  );
}


const DayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height:3em;
  background: #475a78;
  color: #fff;
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

const Values = styled.div`
  display:flex;
  justify-content: space-around;
  align-items:center;
  height: 50px;
  border: 1px solid #B9BBBD;
  color: #686a6b;
  font-size:1em;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`;

