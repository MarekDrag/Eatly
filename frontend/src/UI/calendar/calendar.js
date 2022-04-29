import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import buildCalendar from './build/build';
import DateContext from '../../contexts/dateContext';

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
                <Previous onClick={() => setValue(prevMonth())}>
                    {String.fromCharCode(171)}
                </Previous>
                <div>
                    {currMontName()} {currYear()}
                </div>
                <Next onClick={() => setValue(nextMonth())}>  
                    {String.fromCharCode(187)}
                </Next>
            </Header>

                <WeekdaysName>Mon</WeekdaysName>
                <WeekdaysName>Tue</WeekdaysName>
                <WeekdaysName>Wed</WeekdaysName>
                <WeekdaysName>Thu</WeekdaysName>
                <WeekdaysName>Fri</WeekdaysName>
                <WeekdaysName>Sat</WeekdaysName>
                <WeekdaysName>Sun</WeekdaysName>
                {calendar.map((week) => (
                    <Week onClick={() => choiceWeek(week)}>
                        {week.map((day) => (
                            <Day onClick={() => setValue(day)}>
                                    {day.format("D").toString()}
                            </Day>))}
                    </Week>))}
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    width: 300px;
    height: fit-content;
    color: white;
    z-index: 1;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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

const Previous = styled.div`
    margin: 0 20px ;
    cursor: pointer;
    font-size: 1.5em;
`;
const Next = styled.div`
    margin: 0 20px ;
    cursor: pointer;
    font-size: 1.5em;
`;

const Day = styled.div`
    display: inline-block;
    width: calc(100%/7);
    height: 44px;
    border: 1px solid black;
    text-align: center; 
`;

const Before = styled.div`
    background: #a6c9aa;
    height: 100%;
    color: grey;
`;

const Week = styled.div`
    background: #519259;
    &:hover {
        background: #064635;
    }
`;