import React, { useState } from 'react';
import PlannerSettings from './planner-settings';
import SiteNavbar from '../siteNav/siteNav';
import styled from 'styled-components';
import Menu from './menu';

export default function MealPlanner(){
    const [dates, setDates] = useState('');
    const updateDates = (data) => {
        setDates(data);
      };
    
    return(
        <Container>
            <SiteNavbar/>
            <Section>
                <PlannerSettings update={updateDates}/>
                <Menu dates={dates}/>
            </Section>
        </Container>
    );
    
};


const Container = styled.div`
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




