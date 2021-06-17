import Chart from 'chart.js';
import refs from './refs';
import api from './apiService';
const moment = require('moment-timezone');
const ctx = document.getElementById('myChart').getContext('2d');

let chartData = {};
const average = (req, data) => {
  const values = data.map(e => e[req]);


  const sum = values.reduce((previous, current) => (current += previous));
  const avg = sum / values.length;
  return Number(avg.toFixed(1));
};
const getChartData = () => {
  const data = api.dataProcessingMoreInfo();
  chartData.days = data.map(e => moment(e.date * 1000).format('ll'));
  chartData.temp = data.map(e => average('temp', e.forecast));
  chartData.humidity = data.map(e => average('humidity', e.forecast));
  chartData.pressure = data.map(e => average('pressure', e.forecast));
  chartData.speed = data.map(e => average('speed', e.forecast));
};
const renderChart = () => {
  getChartData();
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.days,
      datasets: [
        {
          label: ' — Температура, C°',
          backgroundColor: 'rgb(255, 107, 8)',
          borderColor: 'rgb(255, 107, 8)',
          data: chartData.temp,
          fill: false,
        },
        {
          label: ' —  Влажность, %',
          backgroundColor: 'rgb(10, 6, 234)',
          borderColor: 'rgb(10, 6, 234)',
          data: chartData.humidity,
          fill: false,
        },
        {
          label: ' —  Скорость ветра, m/s',
          backgroundColor: 'rgb(235, 155, 5)',
          borderColor: 'rgb(235, 155, 5)',
          data: chartData.speed,
          fill: false,
        },
        {
          label: ' —  Давление, m/m',
          backgroundColor: 'rgb(5, 120, 6)',
          borderColor: 'rgb(5, 120, 6)',
          data: chartData.pressure,
          fill: false,
        },
      ],
    },

    options: {
      title: {
        display: true,
        text: 'Полученные значения',
        position: 'left',
      },
      legend: {
        display: true,
        align: 'start',

        labels: {
          boxWidth: 13,
          boxHeight: 12,
          defaultFontColor: 'rgb(5, 120, 6)',
          padding: 10,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.541)',
            },
            ticks: {
              padding: 20,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.541)',
              stepSize: 0.5,
              zeroLineColor: 'rgba(255, 255, 255, 0.541)',
            },
            ticks: {
              padding: 18,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

refs.btnShowChart.addEventListener('click', onShowChartClick);
refs.headerOfShowChart.addEventListener('click', onShowChartClick);
refs.btnHideChart.addEventListener('click', onHideChartClick);
refs.headerOfHideChart.addEventListener('click', onHideChartClick);
// Слушаем кнопки Today
refs.btnOneDay[0].addEventListener('click', onHideChartClick);
refs.btnOneDay[1].addEventListener('click', onHideChartClick);

function onShowChartClick() {
  refs.boxOfShowChart.classList.add('hidden') &
    refs.chartBox.classList.add('visible');
  renderChart();
}

function onHideChartClick() {
  refs.chartBox.classList.remove('visible') &
    refs.boxOfShowChart.classList.remove('hidden');
}
