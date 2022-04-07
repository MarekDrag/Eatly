import React from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import { Link } from "react-router-dom";


export default function Header(){
    return(
        <HeaderWrapper>
            <Logo><Link to='/'>EATLY</Link></Logo>
            <Navbar/>
        </HeaderWrapper>
    );
};


const HeaderWrapper = styled.header`
    display: flex;
    width: 100%;
    height: 70px;
    background: rgb(18, 153, 18);
`;
    
const Logo = styled.div`
    text-align: left;
    margin-left: 30px;
    width: 100%;
    a{
        width: 150px;
        font-size: 3em;
        font-weight: 800;
        color: white;
        text-decoration: none;
    }
`;
    
