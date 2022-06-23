import React, { useContext } from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import { Link } from "react-router-dom";
import AuthContext from '../../contexts/authContext';



export default function Header(){
    const {auth} = useContext(AuthContext);

    return(
        <HeaderWrapper>
            <Logo><Link to={auth ? '/planer-posilkow' : '/zaloguj-sie'}>EATLY</Link></Logo>
            <Navbar/>
        </HeaderWrapper>
    );
};


const HeaderWrapper = styled.header`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70px;
    background: #FAF2E8;
    box-shadow: 0 0 0.3em;
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
        color: #00857A;
        text-decoration: none;
    }
    @media(max-width:1000px){
        text-align: center;
        margin-left: 100px;
    }
`;
    
