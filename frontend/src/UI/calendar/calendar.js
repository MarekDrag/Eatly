import React, { useState, useEffect } from 'react';
import style from './calendar.module.css';
import moment, { weekdays } from 'moment';
import buildCalendar from './build/build';

export default function Calendar(props){
    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment());
    const [actualWeek, setActualWeek] = useState('');


    useEffect(() => {
        setCalendar(buildCalendar(value));
    }, [value]);

    function beforeToday(day) {
        return day.isBefore(new Date(), "day");
    }

    function dayStyles(day) {
        if(beforeToday(day)) return `${style.before}`;
        return ''
    }
    
    function choiceWeek(week){
        setActualWeek(week.map(day => {
            return `${day.date()}.${day.month()}`
        }))
        props.update(actualWeek)
    }

    function currMontName() {
        let month = value.format("MMMM");
        const months = {
            January: "Styczeń", 
            February: "Luty", 
            March: "Marzec", 
            April: "Kwiecień", 
            May: "Maj", 
            June: "Czerwiec", 
            July: "Lipiec", 
            August: "Sierpień", 
            September: "Wrzesień", 
            October: "Październik", 
            November: "Listopad", 
            December: "Grudzień"
        }
        return months[month]
    };

    function currYear(){
        return value.format("YYYY")
    }

    function prevMonth(){
        return value.clone().subtract(1, "month");
    }

    function nextMonth(){
        return value.clone().add(1, "month");
    }


    return(
        <div className={style.calendar}>

            <div className={style.header}>
                <div className={style.previous} onClick={() => setValue(prevMonth())}>
                    {String.fromCharCode(171)}
                </div>
                <div className={style.current}>
                    {currMontName()} {currYear()}
                </div>
                <div className={style.next} onClick={() => setValue(nextMonth())}>  
                    {String.fromCharCode(187)}
                </div>
            </div>

            <div>
                <div className={style.weekdays_name}>Pn</div>
                <div className={style.weekdays_name}>Wt</div>
                <div className={style.weekdays_name}>Śr</div>
                <div className={style.weekdays_name}>Czw</div>
                <div className={style.weekdays_name}>Pt</div>
                <div className={style.weekdays_name}>So</div>
                <div className={style.weekdays_name}>Nd</div>
            </div>
            
            <div className={style.body}>
                {calendar.map((week) => (
                    <div className={style.week} onClick={() => choiceWeek(week)}>
                        {week.map((day) => (
                            <div className={style.day} onClick={() => setValue(day)}>
                                <div className={dayStyles(day)}>
                                    {day.format("D").toString()}
                                </div>
                        </div>))}
                </div>))}
            </div>
        </div>
    )
}