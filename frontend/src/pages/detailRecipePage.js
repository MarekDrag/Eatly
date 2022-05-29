import axios from '../axios';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';


export default function DetailRecipePage(){
    const initialRecipe = {name:'', cooking_time:'', instructions:[], ingredients:[], img_url:''}
    const [recipe, setRecipe] = useState(initialRecipe)

    const fetchRecipe = async () => {
        try {
          const res = await axios.get(`/api/recipes`);
          const slug = document.URL.slice(31);
          setRecipe(...res.data.filter(recipe => recipe.slug === slug))
        } catch (err) {
          console.log(err.response);
        }
    };
    useEffect(() => {
        fetchRecipe();
    }, []);

    return(
        <Container>
            <Wrapper>
                <Link to='/przepisy'><ArrowIcon/></Link>
                <Name>{recipe.name.toLocaleUpperCase()}</Name>
                <CookingTime><BiTimeFive/> {recipe.cooking_time}m</CookingTime>
                <IngredientsWrappper>
                    <IngredientTitle>Składniki:</IngredientTitle>
                    {recipe.ingredients.map(ingredient => {
                        return(
                            <Ingredients>
                                    -{ingredient.name}
                                    &nbsp;
                                    {ingredient.quantity}
                                    {ingredient.measure}
                            </Ingredients>
                        )
                    })}
                </IngredientsWrappper>
                <Image src={recipe.img_url}/>
                <Instruction>
                {recipe.instructions.map(instruction => {
                    return(
                        <>
                            <Step>Krok {recipe.instructions.indexOf(instruction)+1}</Step>
                            <div>
                                {instruction}
                            </div>
                        </>
                    )})}
                </Instruction>
            </Wrapper>
        </Container>
    )
}
const Container = styled.div`
    background:#F0F2F5;
`;

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:80%;
    min-height:100vh;
    margin:0 auto;
    padding:160px 0;
    @media (max-width:800px){
        width:100%;
    }
`;

const ArrowIcon = styled(AiOutlineArrowLeft)`
    position:absolute;
    color: #00857A;
    font-size:30px;
    left:30px;
    top:100px;
`;

const Name = styled.div`
    text-align:center;
    width:80%;
    font-size:3em;
    font-weight:600;
`;

const CookingTime = styled.div`
    width:80%;
    margin:40px 0;
    font-size:2em;
    text-align:center;
`;

const IngredientsWrappper = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:40%;
    height:200px;
    @media (max-width:800px){
        order:2;
        width:80%;
    }
`;

const IngredientTitle = styled.div`
    width:100%;
    font-size:1.5em;
    font-weight:600;
`;

const Ingredients = styled.div`
    width:100%;
`;

const Image = styled.img`
    width:40%;
    border-radius:4px;
    @media (max-width:800px){
        order:1;
        width:80%;
        margin:1.5em 0;
    }
`;


const Instruction = styled.div`
    width:80%;
    margin-top:40px;
    @media (max-width:800px){
        order:3;
    }
`;

const Step = styled.div`
    color: #00857A;
    font-weight:600;
    margin-top:20px;
`;

