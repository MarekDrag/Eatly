import React, { useContext } from 'react';
import styled from 'styled-components';
import DateContext from '../../contexts/dateContext';
import Day from './day';


export default function Menu(props){
    const mealNames = ['', "Breakfast", "Lunch", "Dinner", "Summary"];
    const {date} = useContext(DateContext);
    

    return(
        <Container> 
            
            <MealNames>
                {mealNames.map(header => (
                <Header key={header} >{header}</Header>))}
            </MealNames>

            <Day day='Monday'    date={date[0]}/>
            <Day day='Tuesday'   date={date[1]}/>
            <Day day='Wednesday' date={date[2]}/>
            <Day day='Thursday'  date={date[3]}/>
            <Day day='Friday'    date={date[4]}/>
            <Day day='Saturday'  date={date[5]}/>
            <Day day='Sunday'    date={date[6]}/>
        </Container>
    )   
};


const Container = styled.div`
    display: grid;
    grid-template-columns: 2em repeat(7, 1fr);
    background: #F5F7FA;
    border-radius: 5px;
    margin-right: 10px;
    width: 100%;
    border: 1px solid grey;
`;

const MealNames = styled.div`
    display: grid;
    grid-template-rows: 50px repeat(4, 1fr);
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    transform: rotate(-90deg);
    max-width:2em;
`;





