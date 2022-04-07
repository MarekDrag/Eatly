import React from 'react';
import style from './siteNav.module.css';
import { Link } from 'react-router-dom'; 
function SiteNavbar(){
    
    return(
        <aside className={style.aside}>
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
        </aside>
    );

    function NavList(props){
        
        return(
            <div className={style.toggle}>
                <details>
                    <summary className={style.summary}>{props.summary}</summary>
                    <ul>
                        {props.children}
                    </ul>
                </details>
            </div>
        )
    }
    function NavItem(props){
        return(
            <li className={style.listItem}>
                <Link to={props.href}>{props.text}</Link>
            </li>
        )
    }
    
};




export default SiteNavbar;