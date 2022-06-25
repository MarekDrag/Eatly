import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClear} from 'react-icons/ai';
import Day from "../components/mealPlanner/day";
import Loading from '../components/loading';
import axios from '../axios';
import useDate from "../hooks/useDate";
import getRecipes from "../helpers/getRecipes";
import useAuth from "../hooks/useAuth";

export default function MealPlanner() {
  const [date, dispatch] = useDate();
  const isAuthenticated = useAuth();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});
  
 
  const fetchAndSortRecipes = async() => {
    const recipes = await getRecipes(true);
    setOptions(recipes);
    setLoading(true);
  }
  
  const fetchUserData = async() => {
    const userId = sessionStorage.getItem('userId');
    const res = await axios.get(`/api/users/${userId}`);

    // set data from database to sessionStorage
    const mealPlan = res.data.mealPlan;
    for(const key in mealPlan){
      sessionStorage.setItem(key, JSON.stringify(mealPlan[key]));
    }
  }

  const update = async() => {
    // get data from sessionStorage and update it to database
    let mealPlan = {};
    date.map(day => {
      const meal = JSON.parse(sessionStorage.getItem(day));
      if(meal){
        mealPlan[day] = meal;
      }
    })
    const userId = sessionStorage.getItem('userId');
    if(userId){
      await axios.patch(`/api/users/${userId}`, {mealPlan});
    }
  }   

  const clear = async() => {
    const userId = sessionStorage.getItem('userId');
    sessionStorage.clear();
    sessionStorage.setItem('userId', userId);
    await axios.patch(`/api/users/${userId}`, {mealPlan:{}});
    ChangeDate('decrement');
    ChangeDate('increment');
  }
  
  const ChangeDate = (type) => {
    dispatch({type});
  }

  useEffect(() => {
    if(isAuthenticated){
      fetchAndSortRecipes(); 
      fetchUserData();
    }
  },[])

    
  return (
    <Container>
      <Title>Plan posiłków</Title>
       {loading ? (
        <Wrapper onChange={update}>
          <ClearButton onClick={clear}/>
          <PreviousWeek onClick={() => ChangeDate('decrement')}/>
          <NextWeek onClick={() => ChangeDate('increment')}/>
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
          <WrapperLoading>
            <Loading/>
          </WrapperLoading>
        )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap:wrap;
  width:100%;
  padding-top:70px;
  background:#f7f8f9;
`;

const Title = styled.h2`
  width:100%;
  margin-top:50px;
  text-align:center;
  color: #00857A;
`;

const Wrapper = styled.div`
  position:relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width:100%;
  margin-top:50px;
  margin-bottom:40vh;
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
  font-size:2em;
  color:#fff;
  &:active{
    right:0;
  }
`;

const ClearButton = styled(AiOutlineClear)`
  position:absolute;
  background:none;
  border:none;
  top:-35px;
  left:10px;
  font-size:1.5em;
  color:#d13d32;
  &:active{
    top:-25px;
  }
`;


