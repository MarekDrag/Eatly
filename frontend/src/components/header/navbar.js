import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AuthContext from '../../contexts/authContext';

export default function Navbar(){
    const {auth, setAuth} = useContext(AuthContext);

    return(
        <nav>
            <List>
                {auth ? 
                    <>
                        <Li><Link to="/logowanie">Moje konto</Link></Li>
                        <Li onClick={() => setAuth(!auth)}>Wyloguj się</Li>
                    </>
                : 
                    <>
                        <Li><Link to="/logowanie">Zaloguj się</Link></Li>
                        <Li><Link to="/rejestracja">Zarejestruj się</Link></Li>
                    </>
                }
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
    width: 400px;
    height: 70px;
`;
    
const Li = styled.li`
    margin-right: 30px;
    list-style: none;
    color:white;
    cursor: pointer;
    a{
        color: white;
        text-decoration: none;
    }
`;
  
