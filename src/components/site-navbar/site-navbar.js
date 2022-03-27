import React from 'react';
import style from './site-navbar.module.css';

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
                <NavItem href='#' text="Dodaj potrawe"/>
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
                <a href={props.href}>{props.text}</a>
            </li>
        )
    }
    
};




export default SiteNavbar;