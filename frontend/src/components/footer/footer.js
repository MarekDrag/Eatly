import React from 'react';
import style from './footer.module.css';

function Footer(){
    return(
        <footer className={style.footer}>
            <div className={style.copyrights}>
                Copyright © 2022 Eatly
            </div>
        </footer>
    )
}

export default Footer;