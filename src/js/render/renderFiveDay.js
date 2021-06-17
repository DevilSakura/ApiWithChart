import fiveDayTemp from '../../template/fivedays.hbs';
import refs from '../refs';
import api from '../apiService';
let fiveDayData = {};

// Рендерим погоду на 5 дней
const renderFiveDaysWeather = data => {
  fiveDayData = data;
  if (document.querySelector('.temperature-box')) {
    document.querySelector('.temperature-box').remove();
    refs.todayContainer.classList.add('isHiden');
    refs.fiveDaysContainer.classList.remove('isHiden');
    refs.part2City.textContent =
      fiveDayData.city.name + ', ' + fiveDayData.city.country;
    refs.fiveDaysContaineerCityName.textContent =
      fiveDayData.city.name + ', ' + fiveDayData.city.country;
  }
  const daysListItem = document.querySelectorAll('.days-list__item');
  if (daysListItem) {
    daysListItem.forEach(e => e.remove());
  }
  refs.daysFiveListblock.innerHTML += fiveDayTemp(data);
};

// Слушаем кнопки 5 Days
refs.btnFiveDays[0].addEventListener('click', () =>
  api.getFiveDayData().then(data => renderFiveDaysWeather(data)),
);
refs.btnFiveDays[1].addEventListener('click', () =>
  api.getFiveDayData().then(data => renderFiveDaysWeather(data)),
);
