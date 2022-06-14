import styled from "styled-components";
import getRecipes from "../helpers/getRecipes";
import useDate from "../hooks/useDate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState, useEffect } from "react";

export default function ShopList() {
  const [date, dispatch] = useDate();
  const [recipes, setRecipes] = useState([]);

  const getIngredientsList = (mealPlan) => {
    let ingredientList = [];
    for (let i = 0; i < mealPlan.length; i++) {
      const filteredRecipes = recipes.filter(
        (recipe) => recipe._id === mealPlan[0]
      );
      ingredientList.push(...filteredRecipes);
    }
    console.log(ingredientList);
  };

  const getFromSessionStorage = () => {
    let mealPlan = [];
    date.map((day) => {
      const meal = JSON.parse(sessionStorage.getItem(day));
      if (meal) {
        for (const key in meal) {
          if (meal[key]) {
            mealPlan.push(meal[key]);
          }
        }
      }
    });
    return mealPlan;
  };

  const onClick = (type) => {
    dispatch({ type });
  };

  useEffect(() => {
    const mealPlan = getFromSessionStorage();
    getIngredientsList(mealPlan);
  }, [date]);

  useEffect(() => {
    getRecipes(false).then((res) => setRecipes(res));
  }, []);

  return (
    <Container>
      <Title>Lista zakupów</Title>
      <PreviousWeek onClick={() => onClick("decrement")} />
      <NextWeek onClick={() => onClick("increment")} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  padding-top: 70px;
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.h2`
  width: 100%;
  margin-top: 50px;
  text-align: center;
`;

const PreviousWeek = styled(AiOutlineArrowLeft)`
  position: absolute;
  left: 10px;
  color: #00857a;
  font-size: 2em;
  &:active {
    left: 0;
  }
`;

const NextWeek = styled(AiOutlineArrowRight)`
  position: absolute;
  right: 10px;
  color: #00857a;
  font-size: 2em;
  &:active {
    right: 0;
  }
`;
