import React, { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import axios from '../axios';

export default function AddRecipe(){
    const initialValue = { name: '', ingredients:[], instructions:[], cooking_time:'',tags:[], img_url:''};
    const [formValues, setFormValues] = useState(initialValue);
    const [ingredients, setIngredients] = useState([]);

    const fetchIngredients = async () => {
        try {
          const res = await axios.get("/api/ingredients");
          let newIngredients = [""];
          for (const key in res.data) {
            newIngredients.push(res.data[key]);
          }
          console.log(newIngredients);
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
        const slug = formValues.name
        const ingredients = formValues.ingredients;
        const instructions = formValues.instructions;
        const cooking_time = formValues.cooking_time;
        const tags = formValues.tags;
        const img_url = formValues.img_url;

        const recipe = {
            name,
            ingredients,
            instructions,
            cooking_time,
            tags,
            img_url
        }

        axios.post('/api/recipes', recipe)
        .then(res => console.log(res.data));
    }

    return(
        <PageContainer>
                <Title>Add Recipe</Title>
                <Form onSubmit={submit}>

                    <FormItem>
                        <Label htmlFor='name'>Dish name:</Label>
                        <Input 
                        type='text' 
                        id='name' 
                        name='name' 
                        value={formValues.name}
                        onChange={e => handleChange}
                        placeholder='dish name'/>
                    </FormItem>

                    <FormItem>
                        <Label>Składniki:</Label>
                        <Select key={uuidv4()}>
                            {ingredients.map((ingredient) => (
                                <option key={ingredient}>-{ingredient}</option>
                            ))}
                        </Select>
                        <PlusButton onClick={() => {}}/>
                    </FormItem>
                    
                    <FormItem>
                        <Label htmlFor='instructions'>Instrukcje:</Label>
                        <TextArea 
                        type='text' 
                        id='instructions' 
                        name='instructions' 
                        value={formValues.instructions}
                        onChange={e => handleChange}
                        placeholder='instructions' />
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='cooking_time'>Czas gotowania:</Label>
                        <Input 
                        type='number' 
                        id='cooking_time' 
                        name='cooking_time' 
                        value={formValues.cooking_time}
                        onChange={e => handleChange}
                        placeholder='cooking time'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='img_url'>Link do zdjęcia</Label>
                        <Input 
                        type='text' 
                        id='img_url' 
                        name='img_url' 
                        value={formValues.img_url}
                        onChange={e => handleChange}
                        placeholder='image'/>
                    </FormItem>

                    <SubmitButton 
                    type='submit' 
                    value='Create Recipe'
                    />

                </Form>
                <Output>

                </Output>
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
`;

const Title = styled.h2`
    width: 100%;
    text-align: center;
`;

const Output = styled.div`
    width: 50%;
`;

// Forms styles
const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
    padding: 2em;
    width: 50%;
    height: 90%;
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
    padding: 10px;
    text-align:center;
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

//ignredients list styles
const Ingredients = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 60%;
    margin-left: 10%;
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

const Select = styled.select`
    height: 70%;
    width: 100%;
    background: #f5f7fa;
    width: 50%;
    height: 3em;
    border-radius:4px;
    padding: 10px;
    border: 1px solid #767676;
`;
