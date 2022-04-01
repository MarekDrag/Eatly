import {useState} from 'react';
import Calendar from '../../../UI/calendar/calendar';
import style from './planner-settings.module.css';

function PlannerSettings(props){
    const [isOpen, setIsOpen] = useState(true);
   
    return(
        <div className={style.container}>
            <button className={style.text}>Edytuj</button>
            <button className={style.text}>Składniki</button>
            <button className={style.text}>Przepis</button>
            <button onClick={() => setIsOpen(!isOpen)} className={style.text}>Kalendarz</button>
            {isOpen === true ?
                <Calendar update={props.update} />
                : null}
        </div>
    );
};

export default PlannerSettings;