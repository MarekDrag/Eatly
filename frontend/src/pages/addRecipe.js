import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from '../axios';
import {AiOutlinePlus} from 'react-icons/ai';

export default function AddRecipe(){
    const initialValue = { name: '', ingredients:[], instructions:[], cooking_time:'', img_url:''};
    const [formValues, setFormValues] = useState(initialValue);
    const [ingredients, setIngredients] = useState([]);
    const ingredientInput = useRef('');
    const measureInput = useRef('');
    const instructionInput = useRef('');
    
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

    function handleClick(name){
        const ingredient = ingredientInput.current.value;
        const measure = measureInput.current.value;
        const instruction = instructionInput.current.value;

        if(name === 'ingredients' && ingredient !== '' && measure !== ''){
            setFormValues({...formValues, ingredients:[...formValues.ingredients, {name:ingredient, measure}]});
            ingredientInput.current.value='';
            measureInput.current.value='';
        }
        else if(name === 'instructions' && instruction !== ''){
            setFormValues({...formValues, instructions:[...formValues.instructions, instruction]});
            instructionInput.current.value='';
        }
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
                        onChange={e => handleChange(e)}
                        placeholder='np. Ogórkowa'/>
                    </FormItem>

                    <Fieldset>
                            <Label htmlfor='breakfast'>Śniadanie</Label>
                            <Input type='radio' id='breakfast' name='type' value='breakfast'/>
                            <Label htmlfor='lunch'>Obiad</Label>
                            <Input type='radio' id='lunch' name='type' value='lunch'/>
                            <Label htmlfor='dinner'>Kolacja</Label>
                            <Input type='radio' id='dinner' name='type' value='dinner'/>
                    </Fieldset>
   
                    <FormItem>
                        <Label htmlFor='instructions'>Instrukcje:</Label>
                        <TextArea 
                        type='text' 
                        id='instructions' 
                        name='instructions' 
                        ref={instructionInput}
                        placeholder='np. Zagotuj wode i wrzuć do niej wcześniej pokrojonego ogórka' />
                        <PlusInstruction onClick={e => handleClick('instructions')}/>
                        <Components>
                                {formValues.instructions.map(instruction => {
                                return <div>-{instruction}</div>
                                })}
                        </Components>
                    </FormItem>
                  
                    <FormItem>
                        <Label htmlFor='ingredients'>Wybierz składniki:</Label>
                        <Select ref={ingredientInput} name='ingredients'>
                            {ingredients.map(ingredient => {
                              return <option key={ingredient.name} value={ingredient.name}>{ingredient.name} {ingredient.measure}</option>
                            })}
                        </Select>
                        <MeasureInput ref={measureInput} type='number' id='measure'/>
                        <PlusIngredient onClick={e => handleClick('ingredients')}/>
                        <Components>
                            {formValues.ingredients.map(ingredient => {
                                return <div>{ingredient.name} - {ingredient.measure}
                                {ingredients.find(ingred => ingred.name === ingredient.name).measure}
                                </div>
                            })}
                        </Components>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='cooking_time'>Czas gotowania:</Label>
                        <Input 
                        type='number' 
                        id='cooking_time' 
                        name='cooking_time' 
                        onChange={e => handleChange(e)}
                        placeholder='np. 130m'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='img_url'>Link do zdjęcia:</Label>
                        <Input 
                        type='url' 
                        id='img_url' 
                        name='img_url' 
                        onChange={e => handleChange(e)}
                        placeholder='https://sfsd.pl'/>
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
    min-height: 100vh;
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
    padding: 2rem;
    min-width: 80%;
    min-height: 90vh;
`;

const FormItem = styled.div`
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 100%;
    margin: 1%;
`;

const Fieldset = styled.fieldset`
    display:flex;
    justify-content:center;
    align-items:center;
    width: 50%;
    margin: 1%;
    margin-left:10%;
    border:none;
    & input {
        height:1rem;
        margin-left:5px;
        width:1rem;
    }
    & label {
        padding:0;
        width:20%;
    }
`;

const Components = styled.div`
    width:50%;
    margin: 1%;
    margin-left:30%;
    overflow-wrap:break-word;
`;

const Label = styled.label`
    width: 30%;
    padding:10px;
    text-align:end;
`;

const Input = styled.input`
    width: 50%;
    height: 3rem;
    border-radius:4px;
    padding: 10px;
    border: 1px solid #767676;
    &::-webkit-inner-spin-button,::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    }
`;

const TextArea = styled.textarea`
    width: 50%;
    height:5rem;
    border-radius:4px;
    padding: 10px;
    border: 1px solid #767676;
    resize: none;
`;

const Select = styled.select`
    width: 30%;
    height: 3rem;
    border-radius:4px;
    border: 1px solid #767676;
`;

const MeasureInput = styled.input`
    width: 19%;
    height: 3rem;
    border-radius:4px;
    padding: 10px;
    margin-left:1%;
    border: 1px solid #767676;
    &::-webkit-inner-spin-button,::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    }
`;



const PlusInstruction = styled(AiOutlinePlus)`
    align-items:center;
    height:5rem;
    margin-left:10px;
    font-size:20px;
    color: #00857A;
    &:hover{
        color:#0afc3a
    }
`;

const PlusIngredient = styled(AiOutlinePlus)`
    align-items:center;
    height:3rem;
    margin-left:10px;
    font-size:20px;
    color: #00857A;
    &:hover{
        color:#0afc3a
    }
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