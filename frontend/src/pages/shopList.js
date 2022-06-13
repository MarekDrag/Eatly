import styled from "styled-components";
import getRecipes from "../helpers/getRecipes";
import useDate from "../hooks/useDate";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import { useEffect } from "react";

export default function ShopList(){
    const [date, dispatch] = useDate();
    
    

    const getFromSessionStorage = () => {
        let mealPlan = {};
        date.map(day => {
          const meal = JSON.parse(sessionStorage.getItem(day));
          if(meal){
            mealPlan[day] = meal;
          }
        })
        return mealPlan;
    }

    const onClick = (type) => {
        dispatch({type});
    }

    useEffect(() => {
        const recipes = getRecipes(false);
    })

    return(
        <Container>
            <Title>Lista zakupów</Title>
            <PreviousWeek onClick={() => onClick('decrement')}/>
            <NextWeek onClick={() => onClick('increment')}/>
        </Container>
    )
}


const Container = styled.div`
    position:relative;
    padding-top:70px;
    min-height:100vh;
    width:100%;
`;

const Title = styled.h2`
    width:100%;
    margin-top:50px;
    text-align:center;
`;

const PreviousWeek = styled(AiOutlineArrowLeft)`
  position:absolute;
  left:10px;
  color:#00857A;
  font-size:2em;
  &:active{
    left:0;
  }
`;

const NextWeek = styled(AiOutlineArrowRight)`
  position:absolute;
  right:10px;
  color:#00857A;
  font-size:2em;
  &:active{
    right:0;
  }
`;