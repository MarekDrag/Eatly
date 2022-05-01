import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DateContext from "../../contexts/dateContext";
import Day from "./day";
import axios from "../../axios";
import LoadingContext from "../../contexts/loadingContext";
import Loading from "../loading/loading";

export default function Menu(props) {
  const mealNames = ["", "Breakfast", "Lunch", "Dinner", "Summary"];
  const { date } = useContext(DateContext);
  const [recipes, setRecipes] = useState({});
  const [options, setOptions] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);

  async function fetchRecipes() {
    await axios.get("/api/recipes").then((res) => {
      let arr = [];
      res.data.map((recipe) => {
        const dish = {
          name: recipe.name,
          id: recipe.id,
          nutrition: recipe.nutrition,
          type: recipe.type,
        };
        arr.push(dish);
      });
      let breakfast = arr.filter((recipe) => recipe.type === "breakfast");
      let lunch = arr.filter((recipe) => recipe.type === "lunch");
      let dinner = arr.filter((recipe) => recipe.type === "dinner");
      setOptions({ breakfast, lunch, dinner });
      setRecipes(arr);
      setLoading(!loading);
    });
  }
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container>
      {!loading ? (
        <Wrapper>
          <MealNames>
            {mealNames.map((header) => (
              <Header key={header}>{header}</Header>
            ))}
          </MealNames>
          <Day
            day="Monday"
            options={options}
            recipes={recipes}
            date={date[0]}
          />
          <Day
            day="Tuesday"
            options={options}
            recipes={recipes}
            date={date[1]}
          />
          <Day
            day="Wednesday"
            options={options}
            recipes={recipes}
            date={date[2]}
          />
          <Day
            day="Thursday"
            options={options}
            recipes={recipes}
            date={date[3]}
          />
          <Day
            day="Friday"
            options={options}
            recipes={recipes}
            date={date[4]}
          />
          <Day
            day="Saturday"
            options={options}
            recipes={recipes}
            date={date[5]}
          />
          <Day
            day="Sunday"
            options={options}
            recipes={recipes}
            date={date[6]}
          />
        </Wrapper>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  border-radius: 5px;
  margin-right: 10px;
  width: 100%;
  border: 1px solid grey;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2em repeat(7, 1fr);
  width: 100%;
`;

const MealNames = styled.div`
  display: grid;
  grid-template-rows: 50px repeat(4, 1fr);
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  transform: rotate(-90deg);
  max-width: 2em;
`;
