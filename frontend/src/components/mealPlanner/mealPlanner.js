import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Day from "./day";
import DateContext from "../../contexts/dateContext";
import Loading from '../../UI/loading';
import axios from "../../axios";

export default function MealPlanner() {
  const { date } = useContext(DateContext);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [options, setOptions] = useState({});

    const fetchRecipes = async () => {
        try{
            const res = await axios.get("/api/recipes")
              const arr = [];
              res.data.map((recipe) => {
                const dish = {
                  name: recipe.name,
                  id: recipe.id,
                  calories: recipe.calories,
                  type: recipe.type,
                };
                arr.push(dish);
              });
              let breakfast = arr.filter(recipe => recipe.type === "breakfast");
              let lunch = arr.filter(recipe => recipe.type === "lunch");
              let dinner = arr.filter(recipe => recipe.type === "dinner");
              setOptions({ breakfast, lunch, dinner });
              setRecipes(arr);
              setLoading(!loading);
        } catch (ex) {
            console.log(ex.response);
        }}

    useEffect(() => {
        fetchRecipes()
    },[])
    


  return (
    <Container>
       {loading ? (
        <Wrapper>
        <Day
            day="Poniedziałek"
            options={options}
            recipes={recipes}
            date={date[0]}
          />
          <Day
            day="Wtorek"
            options={options}
            recipes={recipes}
            date={date[1]}
          />
          <Day
            day="Środa"
            options={options}
            recipes={recipes}
            date={date[2]}
          />
          <Day
            day="Czwartek"
            options={options}
            recipes={recipes}
            date={date[3]}
          />
          <Day
            day="Piątek"
            options={options}
            recipes={recipes}
            date={date[4]}
          />
          <Day
            day="Sobota"
            options={options}
            recipes={recipes}
            date={date[5]}
          />
          <Day
            day="Niedziela"
            options={options}
            recipes={recipes}
            date={date[6]}
          />
        </Wrapper>
        ) : (
          <WrapperLoading><Loading/></WrapperLoading>
        )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  margin: 15vh 0 40vh 0;
  background: #f5f7fa;
  @media only screen and (max-width: 750px){
    grid-template-columns: 1fr
  }
`;

const WrapperLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 15vh 0 40vh 0;
  border: 1px solid grey;
  background: #f5f7fa;
`;



