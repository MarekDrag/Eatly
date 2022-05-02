import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import buildCalendar from './build/build';
import DateContext from '../../contexts/dateContext';
import { v4 as uuidv4 } from "uuid";

export default function Calendar(props){
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment());
    const {setDate} = useContext(DateContext);


    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value]);
    
    function choiceWeek(week){
        setDate(week.map(day => {
            return `${day.date()}  ${value.format("MMMM")}`
        }))
    }

    function currMontName() {
        return value.format("MMMM");
    };

    function currYear(){
        return value.format("YYYY")
    }

    function prevMonth(){
        return value.clone().subtract(1, "month");
    }

    function nextMonth(){
        return value.clone().add(1, "month");
    }


    return(
        <Container>

            <Header>
                <ArrowButton onClick={() => setValue(prevMonth())}>
                    {String.fromCharCode(171)}
                </ArrowButton>
                <div>
                    {currMontName()} {currYear()}
                </div>
                <ArrowButton onClick={() => setValue(nextMonth())}>  
                    {String.fromCharCode(187)}
                </ArrowButton>
            </Header>

                <WeekdaysName >Mon</WeekdaysName>
                <WeekdaysName >Tue</WeekdaysName>
                <WeekdaysName >Wed</WeekdaysName>
                <WeekdaysName >Thu</WeekdaysName>
                <WeekdaysName >Fri</WeekdaysName>
                <WeekdaysName >Sat</WeekdaysName>
                <WeekdaysName >Sun</WeekdaysName>
                {calendar.map((week) => (
                    <Week key={uuidv4()} onClick={() => choiceWeek(week)}>
                        {week.map((day) => (
                            <Day key={uuidv4()} onClick={() => setValue(day)}>
                                    {day.format("D").toString()}
                            </Day>))}
                    </Week>))}
        </Container>
    )
}

const Container = styled.div`
    position:absolute;
    width: 150px;
    height: fit-content;
    color: white;
    font-size:10px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:15px;
    height: 40px;
    background: #F0BB62;
`;

const WeekdaysName = styled.div`
    display: inline-block;
    width: calc(100%/7);
    border: 1px solid black;
    background: #064635;
    text-align: center;
`;

const ArrowButton = styled.div`
    margin: 0 20px ;
    font-size: 1.5em;
    cursor: pointer;
`;

const Day = styled.div`
    display: inline-block;
    width: calc(100%/7);
    height: 44px;
    border: 1px solid black;
    text-align: center; 
    cursor: pointer;
`;


const Week = styled.div`
    background: #519259;
    &:hover {
        background: #064635;
    }
`;