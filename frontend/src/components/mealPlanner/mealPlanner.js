import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Day from "./day";
import DateContext from "../../contexts/dateContext";
import Loading from '../loading';
import axios from '../../axios';

export default function MealPlanner() {
  const { date } = useContext(DateContext);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});

    async function fetchRecipes(){
    try{
        const res = await axios.get("/api/recipes");
        let breakfast = res.data.filter(recipe => recipe.type === "breakfast");
        let lunch = res.data.filter(recipe => recipe.type === "lunch");
        let dinner = res.data.filter(recipe => recipe.type === "dinner");
        setOptions({ breakfast, lunch, dinner });
        setLoading(!loading);
    } catch (ex) {
        console.log(ex.response);
    }}
    useEffect(() => {
        fetchUser();
        fetchRecipes(); 
    },[])

    const fetchUser = async() => {
      const userId = sessionStorage.getItem('userId');
      const res = await axios.get(`/api/users/${userId}`);
      
      // set from sessionStorageToDatabase
      const object = res.data.mealPlan;
      for(const key in object){
        sessionStorage.setItem(key, JSON.stringify(object[key]));
      }
    }


    const update = async(e) => {
      // save from sessionStorage to database
      let mealPlan = {};
      date.map(day => {
        const meal = JSON.parse(sessionStorage.getItem(day));
        if(meal){
          mealPlan[day] = meal;
        }
      })
      const userId = sessionStorage.getItem('userId');
      await axios.patch(`/api/users/${userId}`, {mealPlan: mealPlan});
      e.target.innerText = 'Zapisano!';
    }

   
    
  return (
    <Container>
       {loading ? (
        <Wrapper>
        <SaveButton onClick={e => update(e)}>Zapisz</SaveButton>
        <Day
            day="Poniedziałek"
            options={options}
            date={date[0]}
          />
          <Day
            day="Wtorek"
            options={options}
            date={date[1]}
          />
          <Day
            day="Środa"
            options={options}
            date={date[2]}
          />
          <Day
            day="Czwartek"
            options={options}
            date={date[3]}
          />
          <Day
            day="Piątek"
            options={options}
            date={date[4]}
          />
          <Day
            day="Sobota"
            options={options}
            date={date[5]}
          />
          <Day
            day="Niedziela"
            options={options}
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
  background:#F0F2F5;
`;

const SaveButton = styled.button`
  position:absolute;
  height:30px;
  width:100%;
  top:170px;
  background: #00857A;
  color:#fff;
  font-weight:600;
  border:none;
  &:hover{
    background: #069B8C;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  margin: 200px 0 40vh 0;
  box-shadow: 0 0 3px;
  background: #f5f7fa;
  @media(max-width: 1000px){
    grid-template-columns: 1fr;
    margin-top: 150px;
  }
`;

const WrapperLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #f5f7fa;
`;



