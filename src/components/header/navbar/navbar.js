import React from 'react';
import style from './navbar.module.css';

function Navbar(){
    return(
        <nav>
            <ul className={style.nav__container}>
                <li className={style.nav__listItem}><a href="#">Moje konto</a></li>
                <li className={style.nav__listItem}><a href="#">Ustawienia</a></li>
                <li className={style.nav__listItem}><a href="#">FAQ</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;