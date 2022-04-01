import React from 'react';
import style from './register.module.css';

function Register(){
    return(
        <div className={style.page_container}>
            <div className={style.container}>
                <h2 className={style.h2}>Rejestracja</h2>
                <form className={style.form}>
                    <div className={style.form__item}>
                        <label htmlFor='email' className={style.label} >E-mail</label>
                        <input id='email' name='email' type='email' placeholder='E-mail' className={style.input} />
                    </div>
                    <div className={style.form__item}>
                        <label htmlFor='name' className={style.label} >Nazwa</label>
                        <input id='name' name='name' type='text' placeholder='Nazwa' className={style.input} />
                    </div>
                    <div className={style.form__item}>
                        <label htmlFor='password' className={style.label}>Hasło</label>
                        <input type='password' id='password' name='password' placeholder='Hasło' className={style.input} />
                    </div>
                    <div className={style.form__item}>
                        <label htmlFor='password' className={style.label}>Powtórz Hasło</label>
                        <input type='password' id='password' name='password' placeholder='Powtórz Hasło' className={style.input} />
                    </div>
                    <input type='submit' value='Zarejestruj się' className={style.submit} />
                </form>
            </div>
        </div>
    )
}

export default Register;