const film = require('./db.json');
const rows = require('./rows.json');
const dayjs = require('dayjs');

const showDaysProbability = 0.9;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWithProbability(prob) {
  var notRandomNumbers = Array(10).fill(1, 0, prob * 10).fill(0, prob * 10, 10);
  return notRandomNumbers[Math.floor(Math.random() * notRandomNumbers.length)];
}

function getProbabilityFromDiff(diff) {
  // use exponential function for similarity of occupation behavior
  // depending on the proximity of the date 
  const probability = Math.pow(0.892, diff) - 0.2;
  return +probability.toFixed(1);
}

const generateTime = (item) => {
  const hours = [10, 14, 18];
  const minutes = [20, 30, 50];
  return item.hour(hours[getRandomIntInclusive(0, 2)]).minute(minutes[getRandomIntInclusive(0, 2)]).format('YYYY-MM-DDTHH:mm:ss');
}

const generateShowTimes = () => {
  const showtimes = [];
  const occupied = [];
  let id = 1;
  let dateStart = dayjs().startOf('date');
  const dateEnd = dayjs().add(14, 'days');
  while (dateEnd.diff(dateStart, 'days') >= 0) {
    let shows = dayjs().isSame(dateStart, 'date') || randomWithProbability(showDaysProbability)
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

    shows = shows.sort((date1, date2) => dayjs(date1.time).diff(dayjs(date2.time))).map((show) => ({...show, id: id++}));

    showtimes.push({
      date: dateStart.format(),
      shows,
    });

    const occupiedProbability = getProbabilityFromDiff(dayjs(dateStart).diff(dayjs(), 'day'));
    shows.forEach(show => {
      const seats = [];
      rows.forEach(row => {
        row.seats.forEach(seat => {
          if (!seat.disabled && !!randomWithProbability(occupiedProbability))
          seats.push(seat.id);
        })
      });
      occupied.push({
        showId: show.id,
        date: show.time,
        occupied: seats
      });
    });

    dateStart = dateStart.add(1, 'days');
  }
  return { showtimes, occupied };
}

const generateData = () => {
  const { showtimes, occupied } = generateShowTimes();
  return {
    film,
    shows: {
      showtimes,
      cinema: "WorldFilm",
      address: "London, 8 Leicester Square",
    },
    seats: rows,
    occupied,
    reserved: []
  };
};

module.exports = generateData;
