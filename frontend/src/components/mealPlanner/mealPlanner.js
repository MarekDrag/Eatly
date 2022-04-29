import React, { useState } from 'react';
import SiteNavbar from '../siteNav/siteNav';
import styled from 'styled-components';
import Menu from './menu';

export default function MealPlanner(){
    const [dates, setDates] = useState('');
    
    return(
        <Container>
            <SiteNavbar/>
                <Menu/>
        </Container>
    );
    
};


const Container = styled.div`
    display: flex;
    width: 100%;
    margin: 50px 0 40vh 0; 
`;

