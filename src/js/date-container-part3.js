const dayNowRef = document.querySelector('.date__day');
const monthNowRef = document.querySelector('.date__month');
const timeNowRef = document.querySelector('.date__time');
import api from './apiService';
const moment = require('moment-timezone');

//приписка к дате
const nth = function (d) {
  if (d >= 1 && d <= 31) return '-e';
};

const intervalId = setInterval(() => {
  const date = new Date();
  const changeDate = api.oneDayData.timezone
    ? moment(date).utcOffset(api.oneDayData.timezone / 60)
    : moment(date);
  const dayNow = date.getDate();
     
  const weekDayNow = new Intl.DateTimeFormat('ru', {weekday: 'short' }).format(date);

  dayNowRef.innerHTML = `${dayNow}<sup class="date__day--nth">${nth(
    dayNow,
  )}</sup> ${weekDayNow}`;  
  
  monthNowRef.textContent = new Intl.DateTimeFormat('ru', { month: 'long' }).format(date);
  timeNowRef.textContent =
    pad(changeDate.hours()) +
    ':' +
    pad(changeDate.minutes()) +
    ':' +
    pad(changeDate.seconds());
}, 1000);

function pad(value) {
  return String(value).padStart(2, '0');
}
