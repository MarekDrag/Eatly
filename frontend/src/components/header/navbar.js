import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav>
            <List>
                <Li><Link to="/logowanie">Zaloguj się</Link></Li>
                <Li><Link to="/rejestracja">Zarejestruj się</Link></Li>
                <Li><Link to="#">Ustawienia</Link></Li>
                <Li><Link to="#">FAQ</Link></Li>
            </List>
        </nav>
    );
};



const List = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 70px;
`;
    
const Li = styled.li`
    margin-right: 30px;
    list-style: none;
    a{
        color: white;
        text-decoration: none;
    }
`;
  
