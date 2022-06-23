import styled from "styled-components";
import getRecipes from "../helpers/getRecipes";
import useDate from "../hooks/useDate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function ShopList() {
  const [date, dispatch] = useDate();
  const [recipes, setRecipes] = useState([]);
  const [itemsList, setItemsList] = useState([])

  const getFromSessionStorage = () => {
    let mealPlan = [];
    date.map((day) => {
      const meal = JSON.parse(sessionStorage.getItem(day));
      if(meal) {
        for(const key in meal) {
          if(meal[key]) {
            mealPlan.push(meal[key]);
          }
        }
      }
    });
    return mealPlan;
  };
 
  // get ingredients for recipes from the mealPlan by id from sessionStorage
  const getIngredients = (mealPlan) => {
    let ingredientsList = [];
    let shoppingList = [];
    // return list of not added up ingredients 
    for (let i = 0; i < mealPlan.length; i++) {
      recipes
      .filter(x => x._id === mealPlan[i])
      .map(x => x.ingredients)
      .map(ingredient => ingredientsList.push(...ingredient))
    };
    // for each ingredient from getIngredients function add up 
    // quantity and return it
    ingredientsList.map(ingredient => {
      // if ingredientList containt an ingredient, continue loop
      if(shoppingList.filter(x => x.name === ingredient.name).length === 0){
        let quantity = 0;
        ingredientsList.filter(x => x.name === ingredient.name).map(x => {
          quantity += parseInt(x.quantity);
        })
        shoppingList.push({name:ingredient.name, measure:ingredient.measure, quantity}); 
      }
    })
    setItemsList(shoppingList);
  };

  useEffect(() => {
    const mealPlan = getFromSessionStorage();
    getIngredients(mealPlan);
  }, [date, recipes]);

  useEffect(() => {
    getRecipes(false).then((res) => setRecipes(res));
  }, []);

  return (
    <Container>
      <Title>Lista zakupów</Title>
      <Week>
        <PreviousWeek onClick={() => dispatch({type:"decrement"})} />
        {date[0]} - {date[6]}
        <NextWeek onClick={() => dispatch({type:"increment"})} />
      </Week>
      <ShoppingList>
        {itemsList.length > 0 ? (
            itemsList.map(ingredient => {
              return (
                <Item key={ingredient.name}>
                  {ingredient.name}    {ingredient.quantity} {ingredient.measure}
                </Item>)
            })
          )
          : (
          <Empty>
            <p>Brak planu posiłków na ten tydzień.</p>
            <Link to='/planer-posilkow'>Stwórz plan</Link>
          </Empty>
        )}
      </ShoppingList>
      <Info>*Możesz zmienić tydzień max. 2 tygodnie wstecz lub do przodu</Info>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 70px;
  min-height: 100vh;
  width: 100%;
  background:#F7F8F9;
`;

const Title = styled.h2`
  width: 100%;
  margin-top: 50px;
  text-align: center;
  color: #00857a;
`;

const Week = styled.div`
  position: relative;
  width:50%;
  margin:20px auto;
  text-align:center;
  font-weight:600;
  @media(max-width: 1000px){
    margin:50px auto;
    width:60%;
  }
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

const ShoppingList = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  width:50%;
  margin:50px auto;
  padding:0 20px 20px 20px;
  background:#fff;
  border-radius:4px;
  border:5px dashed #00857a;
  @media(max-width: 1000px){
    width:60%;
  }
`;
const Item = styled.div`
  width:60%;
  margin-top:10px;
  margin-left:10%;
  border-bottom:1px dotted black;
  @media(max-width: 1000px){
    width:80%;
  }
`;
const Empty = styled.div`
  width:100%;
  text-align:center;
  margin-top:10px;
  & a {
    font-weight:600;
    color: #00857a;
    text-decoration:none;
      &:hover{
        color:#00ccb7;
      }
  }
`;

const Info = styled.p`
  text-align:center;
`;
