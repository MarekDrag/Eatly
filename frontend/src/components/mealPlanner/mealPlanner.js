import React, {useState, useEffect, useContext} from 'react';
import SiteNavbar from '../siteNav/siteNav';
import styled from 'styled-components';
import MenuMobile from './menu';

export default function MealPlanner(){
    
    return(
        <Container>
            <SiteNavbar/>
            <MenuMobile/>
        </Container>
    );
    
};


const Container = styled.div`
    display: flex;
    width: 100%;
    margin: 50px 0 40vh 0;
`;

