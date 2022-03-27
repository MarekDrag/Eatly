import React from 'react';
import style from './planner-settings.module.css';

function PlannerSettings(){
    return(
        <div className={style.container}>
            <button className={style.text}>Edytuj</button>
            <button className={style.text}>Składniki</button>
            <button className={style.text}>Przepis</button>
        </div>
    );
};

export default PlannerSettings;