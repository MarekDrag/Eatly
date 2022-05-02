import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Day from "./day";
import DateContext from "../../contexts/dateContext";
import Loading from '../../UI/loading/loading';
import axios from "../../axios";

export default function MenuMobile() {
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
                  nutrition: recipe.nutrition,
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
          <WrapperLoading><Loading/></WrapperLoading>
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
  margin-left:160px;
  width:100%;
  border: 1px solid grey;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 80vh;
  overflow-y:scroll;
  &::-webkit-scrollbar {
  width: 12px;
  }
  &::-webkit-scrollbar-thumb {
  background-color:  #475A78;
  border-radius: 10px;
  border: 2px solid #98bdf2;
  }
`;

const WrapperLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;



