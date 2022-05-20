import React, { useContext, useState } from 'react';
import style from './navbar.module.css';
import { Link } from "react-router-dom";
import AuthContext from '../../contexts/authContext';
import {GiExitDoor, GiEntryDoor, GiArchiveRegister} from 'react-icons/gi';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {RiCreativeCommonsByLine} from 'react-icons/ri';
import {HiOutlineClipboardList} from 'react-icons/hi';
import {GoCalendar} from 'react-icons/go';


export default function Navbar(){
    const {auth, setAuth} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav>
            <div className={`${isOpen ? style.darkBgActive : style.darkBg}`} onClick={() => setIsOpen(!isOpen)}></div>
            <ul className={`${style.list} ${isOpen ? style.active : ''}`}>
                <li className={style.li}>
                    <Link to="/planer-posilkow"><GoCalendar/> Planer</Link>
                </li>
                <li className={style.li}>
                    <Link to="zakupy"><AiOutlineShoppingCart/> Zakupy</Link>
                </li>
                <li className={style.li}>
                    <Link to="przepisy"><HiOutlineClipboardList/> Przepisy</Link>
                </li>
                {auth ? 
                    <>
                        <li className={style.li}>
                            <Link to=""><RiCreativeCommonsByLine/> Moje konto</Link>
                        </li>
                        <li className={style.li} onClick={() => setAuth(!auth)}>
                            <GiEntryDoor/> Wyloguj się
                        </li>
                    </>
                : 
                    <>
                        <li className={style.li}>
                            <Link to="/zarejstruj-sie"><GiArchiveRegister/> Zarejstruj się</Link>
                        </li>
                        <li className={style.li}>
                            <Link to="/zaloguj-sie"><GiExitDoor/> Zaloguj się</Link>
                        </li>
                    </>
                }
            </ul>
            <div 
            className={`${style.hamburger} ${isOpen ? style.active : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            >
                <span className={style.bar}></span>
                <span className={style.bar}></span>
                <span className={style.bar}></span>
            </div>
        </nav>
    );
};

