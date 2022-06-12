import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Day from "../components/mealPlanner/day";
import Loading from '../components/loading';
import axios from '../axios';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import useDate from "../hooks/useDate";

export default function MealPlanner() {
  const [date, dispatch] = useDate();
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

    const update = async() => {
      // take data from sessionStorage and update it to database
      let mealPlan = {};
      date.map(day => {
        const meal = JSON.parse(sessionStorage.getItem(day));
        if(meal){
          mealPlan[day] = meal;
        }
      })
      const userId = sessionStorage.getItem('userId');
      await axios.patch(`/api/users/${userId}`, {mealPlan: mealPlan});
    }   
    const onClick = (type) => {
      dispatch({type});
      
    }

    
  return (
    <Container>
       {loading ? (
        <Wrapper onChange={update}>
        <PreviousWeek onClick={() => onClick('decrement')}/>
        <NextWeek onClick={() => onClick('increment')}/>
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


const Wrapper = styled.div`
  position:relative;
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

const PreviousWeek = styled(AiOutlineArrowLeft)`
  position:absolute;
  left:10px;
  color:#fff;
  font-size:2em;
  &:active{
    left:0;
  }
`;

const NextWeek = styled(AiOutlineArrowRight)`
  position:absolute;
  right:10px;
  color:#fff;
  font-size:2em;
  &:active{
    right:0;
  }
`;


