import React from 'react';
import style from './days.module.css';

function Days(props){
    
    const dates = [...props.dates];

    function Day(props){
        const dishes = ['','Ogórkowa', 'Pomidorowa', 'Placki']
        const nameOfMeals = ["Śniadanie", "II Śniadanie", "Obiad", "Deser", "Kolacja"];
        const numberOfMeals = [0,1,2,3,4];
        return(
            <div className={style.row__container}>
                {/* return day div */}
                <div className={style.day}>
                    <span className={style.day__text}>{props.day}</span>
                    <span className={style.day__date}>{props.date}</span>
                </div>
                {/* retrun {numberOfMeals} divs with select */}
                {numberOfMeals.map(meal => (
                    <div className={style.dish}>
                        {/* return select with all dishes */}
                        <select id={`${props.day} ${nameOfMeals[meal]}`} className={style.dish__select}>
                            {dishes.map(dish =>( <option >{dish}</option> ))}
                        </select>
                    </div>
                ))}
                
                <div className={style.calories}></div>

            </div>
    )}
    
    return(
        <>
            <Day day='Poniedziałek' date={dates[0]}/>
            <Day day='Wtorek'       date={dates[1]}/>
            <Day day='Środa'        date={dates[2]}/>
            <Day day='Czwartek'     date={dates[3]}/>
            <Day day='Piątek'       date={dates[4]}/>
            <Day day='Sobota'       date={dates[5]}/>
            <Day day='Niedziela'    date={dates[6]}/>
        </>
    )   
};

export default Days;
