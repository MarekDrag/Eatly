import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from '../axios';
import { useState, useEffect } from "react";

export default function Recipes(){
    const [recipes, setRecipes] = useState([]);
    const [type, setType] = useState('breakfast');
    const navigate = useNavigate();

    const fetchRecipes = async () => {
        try {
          const res = await axios.get("/api/recipes");
          setRecipes(res.data);
        } catch (err) {
          console.log(err.response);
        }
    };
    useEffect(() => {
        fetchRecipes();
    }, []);

    function changeMealType(value){
        setType(value)
    }

    return(
        <Container>
            <Meals>
                <MealButton onClick={() => changeMealType('breakfast')}>Śniadanie</MealButton>
                <MealButton onClick={() => changeMealType('lunch')}>Obiad</MealButton>
                <MealButton onClick={() => changeMealType('dinner')}>Kolacja</MealButton>
                <MealButton>
                    <Link to='/przepisy/dodaj-przepis'>+Dodaj Przepis</Link>
                </MealButton>
            </Meals>
            <Wrapper>
                {recipes.filter(recipe => recipe.type === type).map(recipe => {
                    return(

                            <Recipe key={recipe._id} 
                            onClick={() => {navigate(`/przepisy/${recipe._id}`)}}>
                                <Image src={recipe.img_url}/>
                                <Name>{recipe.name}</Name>
                                <CookingTime>Czas gotowania: {recipe.cooking_time}m</CookingTime>
                            </Recipe>
                    )})}

            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:100%;
    min-height:100vh;
    padding-top:70px;
    background:#f7f8f9;
`;

const Meals = styled.div`
    display:flex;
    justify-content: center;
    gap:10px;
    height:3em;
    width:80%;
    margin-top:5%;
`;

const MealButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:10em;
    height:3em;
    background: #00857A;
    color:#fff;
    font-weight:600;
    border-radius:5px;
    border:none;
    &:hover{
        background: #069b8c;
        cursor:pointer;
    }
    & a{
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
        text-decoration:none;
        width:10em;
        height:3em;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:20px;
    width:90%;
    margin:10% 0 20% 0;
`;

const Recipe = styled.div`
    width:251px;
    height:300px;
    background:#FFF;
    border-radius:5px;
    box-shadow: rgba(0,0,0,0.1) 0 2px 4px 0, rgba(0,0,0,0.1) 0 8px 16px 0;
    &:hover{
        box-shadow: 0px 0px 14px 0px rgba(66, 68, 90, 1);
    }
`;


const Image = styled.img`
    border-radius:5px 5px 0 0;
    width:250px;
    height:200px;
`;

const Name = styled.div`
    margin-top:10px;
    text-align:center;
    width:250px;
    font-size:1.5em;
`;

const CookingTime = styled.div`
    margin-top:10px;
    text-align:center;
    width:250px;
`;
