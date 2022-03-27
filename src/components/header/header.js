import React from 'react';
import style from './header.module.css';
import Navbar from './navbar/navbar';

function Header(){
    return(
        <header className={style.header}>
            <div className={style.logo}><a href="#">EATLY</a></div>
            <Navbar/>
        </header>
    );
};









export default Header;