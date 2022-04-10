import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function Login(){
    const fetchDishes = async() => {
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {from: '0', size: '1', tags: 'under_30_minutes'},
            headers: {
              'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
              'X-RapidAPI-Key': 'fd365bc74amshc7de2402ecd9e44p13b0eejsn7b20538b4486'
            }
        };
    
        const res = await axios.request(options);
        
        let newDishes = [];
        for(const key in res.data.results){
            const dish = res.data.results[key]
    
            const name = dish.name;
            const slug = dish.slug;
            const ingredient = dish.sections;
            const recipe = dish.instructions;
            const description = dish.description;
            const nutrition = dish.nutrition;
            const num_servings = dish.num_servings;
            const cooking_time = dish.total_time_minutes;
            const topics = dish.topics;
            const img_url = dish.thumbnail_url;
            const img_alt = dish.thumbnail_alt_text;
    
            newDishes.push({
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
            })
        }
        return newDishes;
    }
    return(
        <PageContainer>
            <Container>
                <Title>Logowanie</Title>
                <Form>
                    <FormItem>
                        <Label htmlFor='email'>E-mail</Label>
                        <Input id='email' name='email' type='email'/>
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='password'>Hasło</Label>
                        <Input type='password' id='password' name='password'/>
                    </FormItem>
                    <Submit type='submit' value='Zaloguj się'/>
                </Form>
            </Container>
        </PageContainer>
    )
}


const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
    
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    background: white;
    box-shadow: 0 0 1em;
    border-radius: 5px;
    width: 50%;
    min-width: 300px;
    height: 500px;
    margin: 10vh 0 30vh 0;
`;

const Title = styled.h2`
    width: 100%;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    align-items:center;
    justify-content: center;
    flex-wrap: wrap;
    width: 400px;
    height: 400px;
`;

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;  

const Label = styled.label`
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 90%;
    height: 3em;
    border-radius:4px;
    border: none;
    padding: 10px;
    border: 1px solid #767676;
`;

const Submit = styled.input`
    font-size: 1em;
    font-weight: 600;
    background: #129912;
    color: white;
    border-radius:4px;
    border: none;
    width: 50%;
    padding: 1em;
    &:hover{
        background: #4aaf4a;
    }   
`;




