import React, { useRef, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import axios from '../axios';


export default function AddDish(){
    const [name, setName] = useState('');
    const [recipe, setRecipe] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [nutrition, setNutrition] = useState('');
    const [num_servings, setNumServings] = useState('');
    const [cooking_time, setCookingTime] = useState('');
    const [topics, setTopics] = useState('');
    const [img_url, setImgUrl] = useState('');
    const [img_alt, setImgAlt] = useState('');


    const [ingredient, setIngredient] = useState([]);
    const [ingredientList, setIngredientList] = useState(null);
    const ingredientInput = useRef('');

    function IngredientsList(){
        const value = ingredientInput.current.value;
        
        if(value){
            // set to array of ingredients
            ingredient.unshift(value.toLowerCase());
            setIngredient(ingredient);
            // change value of input to ''
            ingredientInput.current.value = '';
            ingredientInput.current.focus();
            // return a list with new ingredient
            const list = ingredient.map((newIngredient) => {
                return <IngredientItem key={uuidv4()}>- {newIngredient}</IngredientItem>})
            setIngredientList(list);
        }
        return ingredientList
    }

    function submit(e){
        e.preventDefault();
        const dish = {
            name,
            slug,
            ingredient,
            recipe,
            description,
            nutrition,
            num_servings,
            cooking_time,
            topics,
            img_url,
            img_alt
        }

        axios.post('/api/dishes', dish)
        .then(res => console.log(res.data));
    }

    return(
        <PageContainer>
            <Container>
                <Title>Stwórz przepis</Title>
                <Form onSubmit={submit}>

                    <FormItem>
                        <Label htmlFor='name'>Nazwa posiłku:</Label>
                        <Input 
                        type='text' 
                        id='name' 
                        name='name' 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='nazwa' />
                    </FormItem>
                    
                    <FormItem>
                        <Label htmlFor='ingredients'>Składniki:</Label>
                        <Ingredients>
                            <IngredientInput 
                            ref={ingredientInput} 
                            type='text' 
                            id='ingredients' 
                            name='ingredients' 
                            placeholder='składnik'/>
                            <PlusButton onClick={() => IngredientsList()}/>
                            <IngredientsList/>
                        </Ingredients>
                    </FormItem>
                    
                    <FormItem>
                        <Label htmlFor='recipe'>Przepis:</Label>
                        <TextArea 
                        type='text' 
                        id='recipe' 
                        name='recipe' 
                        value={recipe}
                        onChange={e => setRecipe(e.target.value)}
                        placeholder='przepis' />
                    </FormItem>
                    
                    <FormItem>
                        <Label htmlFor='description'>Opis:</Label>
                        <TextArea 
                        type='text' 
                        id='description' 
                        name='description' 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='opis'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='nutrition'>Składniki odżywcze:</Label>
                        <Input 
                        type='text' 
                        id='nutrition' 
                        name='nutrition' 
                        value={nutrition}
                        onChange={e => setNutrition(e.target.value)}
                        placeholder='Składniki odżywcze'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='num_servings'>Liczba posiłków:</Label>
                        <Input 
                        type='number' 
                        id='num_servings' 
                        name='num_servings' 
                        value={num_servings}
                        onChange={e => setNumServings(e.target.value)}
                        placeholder='Liczba posiłków'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='cooking_time'>Czas gotowania:</Label>
                        <Input 
                        type='number' 
                        id='cooking_time' 
                        name='cooking_time' 
                        value={cooking_time}
                        onChange={e => setCookingTime(e.target.value)}
                        placeholder='Czas gotowania'/>
                    </FormItem>
                    
                    <FormItem>
                        <Label htmlFor='topics'>Tematy gotowania:</Label>
                        <Input 
                        type='text' 
                        id='topics' 
                        name='topics' 
                        value={topics}
                        onChange={e => setTopics(e.target.value)}
                        placeholder='Tematy gotowania'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='img_url'>Zdjęcie:</Label>
                        <Input 
                        type='text' 
                        id='img_url' 
                        name='img_url' 
                        value={img_url}
                        onChange={e => setImgUrl(e.target.value)}
                        placeholder='Zdjęcie'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='img_alt'>Opis zdjęcia:</Label>
                        <Input 
                        type='text' 
                        id='img_alt' 
                        name='img_alt' 
                        value={img_alt}
                        onChange={e => setImgAlt(e.target.value)}
                        placeholder='Opis zdjęcia'/>
                    </FormItem>
                    
                    <SubmitButton 
                    type='submit' 
                    value='Stwórz przepis'
                    />
                </Form>
            </Container>
        </PageContainer>
    )
}

//containers
const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    width: 80%;
    margin: 10vh 0 30vh 0;
    padding: 2em;
    border: 1px solid #767676;
    border-radius: 4px;
    box-shadow: 0 0 1em;
`;


const Title = styled.h2`
    width: 100%;
    text-align: center;
`;

// Forms styles
const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
    padding: 2em;
    width: 100%;
    height: 70%;
`;

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 0.75em;
`;

const Label = styled.label`
    width: 100%;
    text-align: center;
    padding: 10px;
`;

const Input = styled.input`
    width: 50%;
    height: 3em;
    border-radius:4px;
    border: none;
    padding: 10px;
    border: 1px solid #767676;
`;

const TextArea = styled.textarea`
    width: 50%;
    min-height: 5em;
    border-radius:4px;
    border: none;
    padding: 10px;
    border: 1px solid #767676;
    resize: none;
`;

const SubmitButton = styled.input`
    font-size: 1em;
    font-weight: 600;
    background: #129912;
    color: white;
    border-radius:4px;
    border: none;
    width: 200px;
    height: 50px;
    padding: 1em;
    margin-top: 2em;
    &:hover{
        background: #4aaf4a;
    }
`;

//ignredients list and input styles
const Ingredients = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 60%;
    margin-left: 10%;
`;

const IngredientInput = styled.input `
    width: 83%;
    height: 3em;
    padding: 10px;
`;

const PlusButton = styled(FiPlusCircle)`
    font-size: 30px;
    color: #129912;
    margin-left: 15px;
    background: none;
    border: none;
    &:hover{
        color: #1bff1b;
    }
`;

const IngredientItem = styled.div `
    width: 100%;
    padding-left: 1em;
`;