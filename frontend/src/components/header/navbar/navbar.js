import React from 'react';
import style from './navbar.module.css';
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav>
            <ul className={style.nav__container}>
                <li className={style.nav__listItem}><Link to="/logowanie">Zaloguj się</Link></li>
                <li className={style.nav__listItem}><Link to="/rejestracja">Zarejestruj się</Link></li>
                <li className={style.nav__listItem}><Link to="#">Ustawienia</Link></li>
                <li className={style.nav__listItem}><Link to="#">FAQ</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;