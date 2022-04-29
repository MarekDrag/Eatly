import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../axios";
import { v4 as uuidv4 } from "uuid";
import { FiPlusCircle } from "react-icons/fi";

export default function Day(props) {
  const [recipes, setRecipes] = useState([""]);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [addLunch, setAddLunch] = useState(false);
  const [addDinner, setAddDinner] = useState(false);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("/api/dishes");
      let newRecipe = [""];
      for (const key in res.data) {
        newRecipe.push(res.data[key].name);
      }
      setRecipes(newRecipe);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <DayBox>
        <DayText>{props.day}</DayText>
        <DayDate>{props.date}</DayDate>
      </DayBox>
      <Dish key={uuidv4()}>
        <PlusButton onClick={() => setAddBreakfast(!addBreakfast)} />
        {addBreakfast ? (
          <Select id={`${props.day} breakfast`}>
            {recipes.map((recipe) => (
              <option key={uuidv4()}>{recipe}</option>
            ))}
          </Select>
        ) : null}
      </Dish>
      <Dish key={uuidv4()}>
        <PlusButton onClick={() => setAddLunch(!addLunch)} />
        {addLunch ? (
          <Select id={`${props.day} lunch`}>
            {recipes.map((recipe) => (
              <option key={uuidv4()}>{recipe}</option>
            ))}
          </Select>
        ) : null}
      </Dish>
      <Dish key={uuidv4()}>
        <PlusButton onClick={() => setAddDinner(!addDinner)} />
        {addDinner ? (
          <Select id={`${props.day} dinner`}>
            {recipes.map((recipe) => (
              <option key={uuidv4()}>{recipe}</option>
            ))}
          </Select>
        ) : null}
      </Dish>

      <Summary></Summary>
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
  height: 70%;
  width: 100%;
  background: #f5f7fa;
  option {
    text-align: center;
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: 1px solid black;
`;

const PlusButton = styled(FiPlusCircle)`
  height: 30%;
  font-size: 20px;
  color: #9c9b98;
  background: none;
  border: none;
  &:hover {
    color: #c4c3c0;
  }
`;
