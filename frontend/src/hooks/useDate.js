import moment from 'moment';
import { useEffect, useState } from 'react';

export default function useDate(time) {
    const [value, setValue] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState(1);

    useEffect(()=> {
        getDate(time)
    },[time]);

    return [value];


    function getDate(time){
        let currentDate = moment();
        let weekStart = currentDate.clone().startOf('week');
        let days = [];
        // if time is true it will render next week
        // else it will render previous week
        if(time === 1){
        } 
        else if(time === -1){
        } 
    
        for (var i = dayOfWeek; i <= dayOfWeek+6; i++) {
            let monthNumber = moment(weekStart).add(i, 'days').format("M");
            let day = moment(weekStart).add(i, 'days').format("D");
            let month = '';
    
            switch(monthNumber){
                case '1':
                    month = 'Styczeń';
                    break; 
                case '2':
                    month = 'Luty';
                    break; 
                case '3':
                    month = 'Marzec';
                    break; 
                case '4':
                    month = 'Kwiecień';
                    break; 
                case '5':
                    month = 'Maj';
                    break; 
                case '6':
                    month = 'Czerwiec';
                    break; 
                case '7':
                    month = 'Lipiec';
                    break; 
                case '8':
                    month = 'Sierpień';
                    break; 
                case '9':
                    month = 'Wrzesień';
                    break; 
                case '10':
                    month = 'Październik';
                    break; 
                case '11':
                    month = 'Listopad';
                    break; 
                case '12':
                    month = 'Grudzień';
                    break;
            }
    
        const date = `${day} ${month}`;
        days.push(date);
        }
        setValue(days);
    }
}
