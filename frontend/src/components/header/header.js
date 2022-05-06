import React from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import { Link } from "react-router-dom";



export default function Header(){
    

    return(
        <HeaderWrapper>
            <Logo><Link to='/planer-posilkow'>EATLY</Link></Logo>
            <Navbar/>
        </HeaderWrapper>
    );
};


const HeaderWrapper = styled.header`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70px;
    background: #1da508;
    box-shadow: 0 0 1em;
    position: fixed;
    z-index:2
`;
    
const Logo = styled.div`
    text-align: left;
    margin-left: 20px;
    width: 100%;
    a{
        width: 150px;
        font-size: 3em;
        font-weight: 800;
        color: #fff;
        text-decoration: none;
    }
    @media(max-width:1000px){
        text-align: center;
        margin-left: 100px;
    }
`;
    
