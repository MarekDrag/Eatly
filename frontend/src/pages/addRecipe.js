import React, { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import axios from '../axios';

export default function AddRecipe(){
    const initialValue = { name: '', ingredients:[], instructions:[], cooking_time:'', img_url:''};
    const [formValues, setFormValues] = useState(initialValue);
    const [ingredients, setIngredients] = useState([]);

    const fetchIngredients = async () => {
        try {
          const res = await axios.get("/api/ingredients");
          setIngredients(res.data)
        } catch (err) {
          console.log(err.response);
        }
      };
    
      useEffect(() => {
        fetchIngredients();
      }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    function submit(e){
        e.preventDefault();
        const name = formValues.name;
        const slug = formValues.name.split(' ').join('-');
        const ingredients = formValues.ingredients;
        const instructions = formValues.instructions;
        const cooking_time = formValues.cooking_time;
        const img_url = formValues.img_url;

        const recipe = {
            name,
            slug,
            ingredients,
            instructions,
            cooking_time,
            img_url
        }

        axios.post('/api/recipes', recipe)
        .then(res => console.log(res.data));
    }

    return(
        <PageContainer>
                <Title>Dodaj przepis</Title>
                <Form onSubmit={submit}>

                    <FormItem>
                        <Label htmlFor='name'>Nazwa przepisu:</Label>
                        <Input 
                        type='text' 
                        id='name' 
                        name='name' 
                        value={formValues.name}
                        onChange={e => handleChange}
                        placeholder='nazwa przepisu'/>
                    </FormItem>
   
                    <FormItem>
                        <Label htmlFor='instructions'>Instrukcje:</Label>
                        <TextArea 
                        type='text' 
                        id='instructions' 
                        name='instructions' 
                        value={formValues.instructions}
                        onChange={e => handleChange}
                        placeholder='instrukcje' />
                    </FormItem>
                  
                    <FormItem>
                        <Label htmlFor='ingredients'>Wybierz składniki:</Label>
                        <Select name='ingredients'>
                            {ingredients.map(ingredient => {

                              return <option>{ingredient.name}</option>
                            })}
                        </Select>
                        <MeasureInput type='number' id='measure'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='cooking_time'>Czas gotowania:</Label>
                        <Input 
                        type='number' 
                        id='cooking_time' 
                        name='cooking_time' 
                        value={formValues.cooking_time}
                        onChange={e => handleChange}
                        placeholder='czas gotowania'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='img_url'>Link do zdjęcia:</Label>
                        <Input 
                        type='text' 
                        id='img_url' 
                        name='img_url' 
                        value={formValues.img_url}
                        onChange={e => handleChange}
                        placeholder='link'/>
                    </FormItem>

                    <SubmitButton 
                    type='submit' 
                    value='Stwórz przepis'
                    />

                </Form>
        </PageContainer>
    )
}


// STYLES

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100vh;
    padding-top:80px;
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
    width: 80%;
    height: 90%;
`;

const FormItem = styled.div`
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 100%;
`;

const Label = styled.label`
    width: 30%;
    padding:10px;
    text-align:end;
`;

const Input = styled.input`
    width: 50%;
    height: 3em;
    border-radius:4px;
    padding: 10px;
    border: 1px solid #767676;
`;

const TextArea = styled.textarea`
    width: 50%;
    height:6em;
    border-radius:4px;
    padding: 10px;
    border: 1px solid #767676;
    resize: none;
`;

const SubmitButton = styled.input`
    font-size: 1em;
    font-weight: 600;
    background: #00857A;
    color: white;
    border-radius:4px;
    border: none;
    width: 200px;
    height: 50px;
    padding: 1em;
    margin-top: 2em;
    &:hover{
        background: #069b8c;
    }
`;

const Select = styled.select`
    width: 40%;
    height: 3em;
    border-radius:4px;
    border: 1px solid #767676;
`;

const MeasureInput = styled.input`
    width: 10%;
    height: 3em;
    border-radius:4px;
    padding: 10px;
    border: 1px solid #767676;
    &::-webkit-inner-spin-button,::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }
`;