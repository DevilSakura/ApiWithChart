const daysList = document.querySelector('.days-list');
const daysListItem = document.querySelectorAll('.days-list__item');

daysList.addEventListener('click', handleBtnClick);

const activeCardFiveDay = event => {
  const daysListItem = document.querySelectorAll('.days-list__item');
  daysListItem.forEach(e => {
    const day = e.childNodes[1];
    const moreInfoBtn = e.childNodes[9];
    day.classList.remove('days-list__day-of-the-week--active');
    moreInfoBtn.classList.remove('days-list__more-btn__active');
  });
  const target = event.target;
  const day = event.path[1].firstElementChild;
  day.classList.add('days-list__day-of-the-week--active');
  target.classList.add('days-list__more-btn__active');
};

function handleBtnClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName == 'BUTTON') {
    activeCardFiveDay(event);
  }
}
