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
                        <Li><Link to="/login">My account</Link></Li>
                        <Li onClick={() => setAuth(!auth)}>Log out</Li>
                    </>
                : 
                    <>
                        <Li><Link to="/login">Sign In</Link></Li>
                        <Li><Link to="/register">Sign Up</Link></Li>
                    </>
                }
                <Li><Link to="#">Settings</Link></Li>
                <Li><Link to="#">FAQ</Link></Li>
            </List>
        </nav>
    );
};



const List = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 450px;
    height: 70px;
`;
    
const Li = styled.li`
    margin-right: 30px;
    font-weight: 600;
    list-style: none;
    cursor: pointer;
    color: #30b353;
    &:hover{
        color:#44e36f;
    }
    a{
        color: #30b353;
        text-decoration: none;
        &:hover{
            color:#44e36f;
        }
    }
`;
  
