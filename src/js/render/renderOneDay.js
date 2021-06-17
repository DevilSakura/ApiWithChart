const moment = require('moment-timezone');
import oneDayTemp from '../../template/oneday.hbs';
import refs from '../refs';
import api from '../apiService';
let oneDayData = {
  city: 'None',
  countryCode: 'None',
  temp: '0',
  tempMin: '0',
  tempMax: '0',
};

// Рендерим погоду на один день
const renderOneDayWeather = data => {
  oneDayData = data;
  if (!document.querySelector('.temperature-box')) {
    refs.part6.classList.add('isHiden');
    refs.contentBox.insertAdjacentHTML('afterbegin', oneDayTemp(oneDayData));
    renderSunTime(oneDayData.sunrise, oneDayData.sunset);
    refs.todayContainer.classList.remove('isHiden');
    refs.fiveDaysContainer.classList.add('isHiden');
  } else {
    document.querySelector('.temperature-box').remove();
    refs.contentBox.insertAdjacentHTML('afterbegin', oneDayTemp(oneDayData));
    renderSunTime(oneDayData.sunrise, oneDayData.sunset);
  }
};

// Рендер времени заката и восхода
function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}
const renderSunTime = (sunrise, sunset) => {
  sunrise = oneDayData.timezone
    ? moment(sunrise).utcOffset(oneDayData.timezone / 60)
    : moment(sunrise);
  sunset = oneDayData.timezone
    ? moment(sunset).utcOffset(oneDayData.timezone / 60)
    : moment(sunrise);
  const sunriseHours = addZero(sunrise.hours());
  const sunriseMinutes = addZero(sunrise.minutes());
  const sunsetHours = addZero(sunset.hours());
  const sunsetMinutes = addZero(sunset.minutes());
  refs.dateSunriseTime.textContent = sunriseHours + ':' + sunriseMinutes;
  refs.dateSunsetTime.textContent = sunsetHours + ':' + sunsetMinutes;
};

// Слушаем submit поля поиска погоды
refs.searchInput.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const location = formData.get('query');
  api.getOneDayData(location).then(data => renderOneDayWeather(data));
});

// Слушаем кнопки Today
refs.btnOneDay[0].addEventListener('click', () =>
  oneDayDatarenderOneDayWeather(oneDayData),
);
refs.btnOneDay[1].addEventListener('click', () =>
  renderOneDayWeather(oneDayData),
);

// запуск странницы без данных
renderOneDayWeather(oneDayData);

// Даем запрос по гео либо по умолчанию
const defaultReqWeather = searchName => {
  api.getOneDayData(searchName).then(data => renderOneDayWeather(data));
};

export { defaultReqWeather, renderOneDayWeather };
