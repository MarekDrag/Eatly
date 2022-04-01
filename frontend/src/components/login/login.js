import React from 'react';
import style from './login.module.css';

function Login(){
    return(
        <div className={style.page_container}>
            <div className={style.container}>
                <h2 className={style.h2}>Logowanie</h2>
                <form className={style.form}>
                    <div className={style.form__item}>
                        <label htmlFor='email' className={style.label} >E-mail</label>
                        <input id='email' name='email' type='email' className={style.input} />
                    </div>
                    <div className={style.form__item}>
                        <label htmlFor='password' className={style.label}>Hasło</label>
                        <input type='password' id='password' name='password' className={style.input} />
                    </div>
                    <input type='submit' value='Zaloguj się' className={style.submit} />
                </form>
            </div>
        </div>
    )
}

export default Login;
