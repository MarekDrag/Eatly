import React from 'react';
import style from './header.module.css';
import Navbar from './navbar/navbar';
import { Link } from "react-router-dom";

function Header(){
    return(
        <header className={style.header}>
            <div className={style.logo}><Link to='/'>EATLY</Link></div>
            <Navbar/>
        </header>
    );
};









export default Header;