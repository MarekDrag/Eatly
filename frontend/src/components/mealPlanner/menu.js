import React from 'react';
import styled from 'styled-components';
import Day from './day';


export default function Menu(props){
    const headers = ["Plan tygodnia", "Śniadanie", "II Śniadanie", "Obiad", "Deser", "Kolacja", "Kalorie"];
    const dates = [...props.dates];
    

    return(
        <> 
            <RowContainer>
                {headers.map(header => (
                <Header key={header} >{header}</Header>))}
            </RowContainer>
         
            <Day day='Poniedziałek' date={dates[0]}/>
            <Day day='Wtorek'       date={dates[1]}/>
            <Day day='Środa'        date={dates[2]}/>
            <Day day='Czwartek'     date={dates[3]}/>
            <Day day='Piątek'       date={dates[4]}/>
            <Day day='Sobota'       date={dates[5]}/>
            <Day day='Niedziela'    date={dates[6]}/>
        </>
    )   
};


const RowContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50px;
    border: 1px solid black;
`;





