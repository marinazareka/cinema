const film = require('./db.json');
const dayjs = require('dayjs');

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const generateTime = (item) => {
  const hours = [10, 14, 18];
  const minutes = [20, 30, 50];
  return item.hour(hours[getRandomIntInclusive(0, 2)]).minute(minutes[getRandomIntInclusive(0, 2)]).format();
}

const generateShowTimes = () => {
  const showtimes = [];
  let dateStart = dayjs().startOf('date');
  const dateEnd = dayjs().add(14, 'days');
  while (dateEnd.diff(dateStart, 'days') >= 0) {
    const shows = dayjs().isSame(dateStart, 'date') || getRandomIntInclusive(0, 1)
    ? [
        {
          time: generateTime(dateStart),
          hall: 1
        },
        {
          time: generateTime(dateStart),
          hall: 2
        },
      ]
    : [];

    showtimes.push({
      date: dateStart.format(),
      shows: shows.sort((date1, date2) => dayjs(date1.time).diff(dayjs(date2.time)))
    });

    dateStart = dateStart.add(1, 'days');
  }
  return showtimes;
}

const generateData = () => {
  return {
    film,
    showtimes: generateShowTimes()
  };
};

module.exports = generateData;
