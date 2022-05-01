import moment from 'moment';

export default function getCurrentWeek() {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let days = [];
    
    for (var i = 1; i <= 7; i++) {
        days.push(moment(weekStart).add(i, 'days').format("D MMMM"));
    }
    return days;
}