import React, { useState } from 'react';
import PlannerSettings from './planner-settings/planner-settings';
import SiteNavbar from '../siteNav/siteNav';
import style from './dishMenu.module.css';
import Days from './days/days';

function DishMenu(){
    const [dates, setDates] = useState('');
    const updateDates = (data) => {
        setDates(data);
      };
    
    return(
        <div className={style.container}>
            <SiteNavbar/>
            <section className={style.dishMenuContainer}>
                <PlannerSettings update={updateDates}/>
                <Headers/>
                <Days dates={dates}/>
            </section>
        </div>
    );


    function Headers(){
        const headers = ["Plan tygodnia", "Śniadanie", "II Śniadanie", "Obiad", "Deser", "Kolacja", "Kalorie"];

        return(
            <div className={style.row__container}>
                {headers.map(header => (
                <div key={header} className={style.header}>{header}</div>))}
            </div>
    )}

    
};


export default DishMenu;