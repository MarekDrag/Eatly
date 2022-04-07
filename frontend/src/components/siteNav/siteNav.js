import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

export default function SiteNavbar(){
    
    return(
        <Aside>
            <NavList summary="Plan Tygodnia">
                <NavItem href='#' text="Edytuj"/>
                <NavItem href='#' text="Zobacz"/>
            </NavList>
            <NavList summary="Lista zakupów">
                <NavItem href='#' text="Edytuj"/>
                <NavItem href='#' text="Zobacz"/>
            </NavList>
            <NavList summary="Potrawy">
                <NavItem href='/dodaj-potrawe' text="Dodaj potrawe"/>
                <NavItem href='#' text="Zobacz"/>
            </NavList>
            <NavList summary="Alergeny">
                <NavItem href='#' text="Edytuj"/>
                <NavItem href='#' text="Zobacz"/>
            </NavList>
        </Aside>
    );

    function NavList(props){
        
        return(
            <Toggle>
                <details>
                    <Summary>{props.summary}</Summary>
                    <ul>
                        {props.children}
                    </ul>
                </details>
            </Toggle>
        )
    }
    function NavItem(props){
        return(
            <ListItem>
                <Link to={props.href}>{props.text}</Link>
            </ListItem>
        )
    }
    
};

const Aside = styled.aside `
    border: 1px solid rgb(18, 153, 18);
    border-bottom: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    font-weight: 600;
    width: 150px;
    height:fit-content;
    margin-top: 40px;
    margin-right: 1em;
`;

const Toggle = styled.div `
    width: 100%;
    border-bottom: 1px solid rgb(18, 153, 18);
`;

const Summary = styled.summary `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height:50px;
    background-color: rgb(18, 153, 18);
    color: white;
    border: none;
    cursor: pointer;
    list-style-type: none;
    &:hover{
    color: rgb(202, 197, 197);
    }
`;



const ListItem = styled.div `
    list-style: none;
    margin: 10px 0;
    text-align: center;
    a{
    text-decoration: none;
    color: black;
        &:hover{
        text-decoration: none;
        color: grey;
        }
    }
`;

