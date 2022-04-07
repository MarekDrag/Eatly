import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../axios';
import { v4 as uuidv4 } from 'uuid';

export default function Day(props){
    const [dishes, setDishes] = useState([''])

    const fetchDishes = async () => {
        try {
            const res = await axios.get('/api/dishes');
            let newDish = [''];
            for (const key in res.data) {
                newDish.push(res.data[key].name)
            }
            setDishes(newDish)
        } catch (err) {
            console.log(err.response);
        }
    }
    
    useEffect(() => {
        fetchDishes();
    }, [])
    // console.log(dishes);

    const nameOfMeals = ["Śniadanie", "II Śniadanie", "Obiad", "Deser", "Kolacja"];
    const numberOfMeals = [0,1,2,3,4];

    return(
        <RowContainer>
            <DayBox>
                <DayText>{props.day}</DayText>
                <DayDate>{props.date}</DayDate>
            </DayBox>
            {numberOfMeals.map(meal => (
                <Dish key={uuidv4()} >
                    {/* return select with all dishes */}
                    <Select id={`${props.day} ${nameOfMeals[meal]}`}>
                        {dishes.map(dish =>( <option  key={uuidv4()}>{dish}</option> ))}
                    </Select>
                </Dish>
            ))}
            
            <Calories></Calories>

        </RowContainer>
)}

const RowContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const DayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 50px;
    border: 1px solid black;
`;

const DayText = styled.span`
    width: 100%;
    text-align: center;
`;

const DayDate = styled.span`
    width: 100%;
    text-align: center;
    font-size: 0.75em;
`;

const Dish = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    border: 1px solid black;
`;

const Select = styled.select`
    width: 100%;
    height: 100%;
    appearance: none;
    border:none;
    option{
    text-align: center;
    }
`;

const Calories = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    border: 1px solid black;
`;
