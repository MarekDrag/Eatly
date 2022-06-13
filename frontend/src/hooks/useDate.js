import moment from 'moment';
import { useEffect, useReducer, useState } from 'react';

export default function useDate() {
    const [value, setValue] = useState([]);
    const [count, dispatch] = useReducer(countReducer, 1)
    
    function countReducer(state, action) {
        switch (action.type) {
            case 'increment':
                return state + 7;
            case 'decrement':
                return state - 7;
            default: return;
        }
    }

    useEffect(()=> {
        getDate()
    },[count]);

    return [value, dispatch];

    function getDate(){
        let currentDate = moment();
        let weekStart = currentDate.clone().startOf('week');
        let days = [];
    
        for (var i = count; i <= count+6; i++) {
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
                default: return;
            }
    
        const date = `${day} ${month}`;
        days.push(date);
        }
        setValue(days);
    }
}
