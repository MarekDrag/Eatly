import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from '../axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai';
import calculatePriceAndCalories from '../helpers/calculateRecipe';

export default function AddRecipe(){
    const initialValue = { name: '', ingredients:[], instructions:[], cooking_time:'', img_url:'', type:''};
    const [formValues, setFormValues] = useState(initialValue);
    const [ingredients, setIngredients] = useState([]);
    const ingredientInput = useRef('');
    const quantityInput = useRef('');
    const instructionInput = useRef('');
    const navigate = useNavigate();
  
    async function fetchIngredients(){
        try {
          const res = await axios.get("/api/ingredients");
          const arr = ['', ...res.data];
          setIngredients(arr);
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
        const ingredient = ingredientInput.current.value.split('/');
        const quantity = quantityInput.current.value;
        const instruction = instructionInput.current.value;

        if(name === 'ingredients' && ingredient !== '' && quantity !== ''){
            const name = ingredient[0];
            const measure = ingredient[1];
            setFormValues({...formValues, ingredients:[...formValues.ingredients, {name, measure, quantity}]});
            ingredientInput.current.value='';
            quantityInput.current.value='';
            ingredientInput.current.focus();
        }
        else if(name === 'instructions' && instruction !== ''){
            setFormValues({...formValues, instructions:[...formValues.instructions, instruction]});
            instructionInput.current.value='';
            instructionInput.current.focus();
        }
    }

    function submit(e){
        e.preventDefault();
        const [price, calories] = calculatePriceAndCalories(ingredients, formValues.ingredients);
        const recipe = {
            name: formValues.name,
            type: formValues.type,
            ingredients: formValues.ingredients,
            instructions:  formValues.instructions,
            cooking_time: formValues.cooking_time,
            price,
            calories,
            img_url: formValues.img_url
        }
        
        axios.post('/api/recipes', recipe)
        .then(res => console.log(res.data));
        navigate('/przepisy');
    }

    return(
        <PageContainer>
                <Title>Dodaj przepis</Title>
                <Link to='/przepisy'><ArrowIcon/></Link>
                <Form onSubmit={submit}>

                    <FormItem>
                        <Label htmlFor='name'>Nazwa przepisu:</Label>
                        <Input 
                        required
                        type='text' 
                        id='name' 
                        name='name' 
                        onChange={e => handleChange(e)}
                        placeholder='Nazwa dania'/>
                    </FormItem>

                    <Fieldset required>
                            <label htmlfor='breakfast'>Śniadanie</label>
                            <input type='radio' id='breakfast' name='type' value='breakfast' onChange={e => handleChange(e)}/>
                            <label htmlfor='lunch'>Obiad</label>
                            <input type='radio' id='lunch' name='type' value='lunch' onChange={e => handleChange(e)}/>
                            <label htmlfor='dinner'>Kolacja</label>
                            <input type='radio' id='dinner' name='type' value='dinner' onChange={e => handleChange(e)}/>
                    </Fieldset>
   
                    <FormItem>
                        <Label htmlFor='instructions'>Instrukcje:</Label>
                        <TextArea 
                        type='text' 
                        id='instructions' 
                        name='instructions' 
                        ref={instructionInput}
                        placeholder='np. Pokrój marchewkę w kostkę' />
                        <PlusInstruction onClick={() => handleClick('instructions')}/>
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
                              return <option 
                                key={ingredient.name} 
                                value={`${ingredient.name}/${ingredient.measure}`}>
                                    {ingredient.name} {ingredient.measure}
                              </option>
                            })}
                        </Select>
                        <MeasureInput ref={quantityInput} type='number' id='quanity' placeholder='Podaj ilość'/>
                        <PlusIngredient onClick={() => handleClick('ingredients')}/>
                        <Components>
                            {formValues.ingredients.map(ingredient => {
                                return <div>{ingredient.name} - {ingredient.quantity}{ingredient.measure}
                                </div>
                            })}
                        </Components>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='cooking_time'>Czas gotowania:</Label>
                        <Input 
                        required
                        type='number' 
                        id='cooking_time' 
                        name='cooking_time' 
                        onChange={e => handleChange(e)}
                        placeholder='Czas podaj w minutach'/>
                    </FormItem>

                    <FormItem>
                        <Label htmlFor='img_url'>Link do zdjęcia:</Label>
                        <Input 
                        required
                        type='text' 
                        id='img_url' 
                        name='img_url' 
                        onChange={e => handleChange(e)}
                        placeholder='https://zdjęcie.com'/>
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
    padding-top:150px;
    padding-bottom:20vh;
    background:#F0F2F5;
`;

const Title = styled.h2`
    width: 100%;
    text-align: center;
`;

const ArrowIcon = styled(AiOutlineArrowLeft)`
    position:absolute;
    color: #00857A;
    font-size:30px;
    left:30px;
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
    flex-wrap:wrap;
    align-items:center;
    width: 25%;
    margin: 1%;
    margin-left:10%;
    border:none;
    & input {
        height:1rem;
        width:1rem;
        margin-left:20px;
    }
    & label {
        width:60%;
        text-align:right;
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