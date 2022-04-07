import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../axios';

export default function Day(props){
    let dishes = [];

    // const fetchDishes = async () => {
    //     const response = await axios.get('/api/dishes')
    //         .then(res => console.log(res.data))
    //     response.map(dish => {
    //         dishes.push(dish.name)
    //     })
    //     console.log();
    // }
    
    // useEffect(() => {
    //     fetchDishes();
    // }, [])
    

    const nameOfMeals = ["Śniadanie", "II Śniadanie", "Obiad", "Deser", "Kolacja"];
    const numberOfMeals = [0,1,2,3,4];

    return(
        <RowContainer>
            <DayBox>
                <DayText>{props.day}</DayText>
                <DayDate>{props.date}</DayDate>
            </DayBox>
            {numberOfMeals.map(meal => (
                <Dish>
                    {/* return select with all dishes */}
                    <Select id={`${props.day} ${nameOfMeals[meal]}`}>
                        {dishes.map(dish =>( <option>{dish}</option> ))}
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
