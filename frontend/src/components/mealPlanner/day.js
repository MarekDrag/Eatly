import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function Day(props) {
  const initialMeals = {breakfast: '', lunch: '', dinner: ''}
  const [calories, setCalories] = useState(0);
  const [mealsID, setMealsID] = useState(initialMeals);
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
    const {id, recipe} = e.target.value;
    setMealsID({ ...mealsID, [name]: id });
    setMealsNames({...mealsNames, [name]: recipe})
    setToLocalStorage({ ...mealsID, [name]: id });
  };
  
  useEffect(() => {
    let existing = localStorage.getItem(props.date);
    if(existing){
      setMealsID(JSON.parse(existing)); 
    }
  }, []);

  useEffect(() => {
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
                <option value={mealsID.breakfast}>{mealsNames.breakfast}</option>
                {props.options.breakfast.map(recipe => (
                  <option key={uuidv4()} value={{id:recipe.id, recipe:recipe.name}}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>
        <Dish key={uuidv4()}>
            <BoxType>Obiad</BoxType>
            <Select name='lunch' onChange={e => handleChange(e)}>
                <option value={mealsID.breakfast}>{mealsNames.lunch}</option>
                {props.options.lunch.map(recipe => (
                  <option key={uuidv4()} value={{id:recipe.id, recipe:recipe.name}}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>
        <Dish key={uuidv4()}>
            <BoxType>Kolacja</BoxType>
            <Select name='dinner' onChange={e => handleChange(e)}>
              <option value={mealsID.dinner}>{mealsNames.dinner}</option>
                {props.options.dinner.map(recipe => (
                  <option key={uuidv4()} value={{id:recipe.id, recipe:recipe.name}}>
                    {recipe.name}
                  </option>
                ))}
            </Select>
        </Dish>

        <Calories>
          <p>Kalorie:{calories}</p>
        </Calories>
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

const Dish = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
  height: 100px;
  border: 1px solid #B9BBBD;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`;

const BoxType = styled.div`
  position:absolute;
  font-size:20px;
  color:#B9BBBD;
`;

const Select = styled.select`
  height: 100%;
  width: 100%;
  border:none;
  background: #f5f7fa;
  & option {
    text-align:center;
  }
`;


const Calories = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  height: 50px;
  border: 1px solid #B9BBBD;
  color: #686a6b;
  font-size:1em;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`;

