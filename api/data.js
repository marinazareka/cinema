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
  const shows = [];
  let dateStart = dayjs().startOf('date');
  const dateEnd = dayjs().add(14, 'days');
  while (dateEnd.diff(dateStart, 'days') >= 0) {
    shows.push({
      date: dateStart.format(),
      shows: dayjs().isSame(dateStart) || getRandomIntInclusive(0, 1)
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
        : []
    });

    dateStart = dateStart.add(1, 'days');
  }
  return shows;
}

const generateData = () => {
  return {
    film,
    showtimes: generateShowTimes()
  };
};

module.exports = generateData;
