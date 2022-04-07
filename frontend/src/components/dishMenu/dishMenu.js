import React, { useState } from 'react';
import PlannerSettings from './planner-settings/planner-settings';
import SiteNavbar from '../siteNav/siteNav';
import styled from 'styled-components';
import Days from './days/days';

export default function DishMenu(){
    const [dates, setDates] = useState('');
    const updateDates = (data) => {
        setDates(data);
      };
    
    return(
        <PageContainer>
            <SiteNavbar/>
            <Section>
                <PlannerSettings update={updateDates}/>
                <Headers/>
                <Days dates={dates}/>
            </Section>
        </PageContainer>
    );


    function Headers(){
        const headers = ["Plan tygodnia", "Śniadanie", "II Śniadanie", "Obiad", "Deser", "Kolacja", "Kalorie"];

        return(
            <RowContainer>
                {headers.map(header => (
                <Header key={header} >{header}</Header>))}
            </RowContainer>
    )}

    
};




const PageContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 70px);
    margin-top: 50px;
`;

const Section = styled.section`
    border-radius: 5px;
    margin-right: 10px;
    width: 100%;
`;

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
