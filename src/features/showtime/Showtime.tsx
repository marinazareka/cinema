import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DayModifiers } from 'react-day-picker';
import dayjs from 'dayjs';
import { ShowTimeContainer, Calendar, Tip } from './styled';
import { getAvailableShowTimes, getDateChosen, setDateChosen, getDisabled } from './showtimeSlice';
import { resetSeats } from '../seatchoice/seatChoiceSlice';
import Time from './Time';

const ShowTime: FunctionComponent = () => {
  const dispatch = useDispatch();
  const showtimes = useSelector(getAvailableShowTimes);
  const dateChosen = useSelector(getDateChosen);
  const disabled = useSelector(getDisabled);

  const disabledDays = showtimes.length
    ? [
      ...showtimes.filter((i) => !i.shows.length).map((i) => new Date(i.date)),
      {
        before: dayjs(showtimes[0].date).isBefore(dayjs())
          ? new Date() : new Date(showtimes[0].date),
        after: new Date(showtimes.slice(-1)[0].date),
      },
    ]
    : {
      from: new Date(dayjs().startOf('month').format()),
      to: new Date(dayjs().endOf('month').format()),
    };

  function onChange(day: Date, modifiers: DayModifiers) {
    if (modifiers.disabled) return;
    if (!modifiers.selected) {
      dispatch(setDateChosen(day.toISOString()));
      dispatch(resetSeats());
    }
  }

  return (
    <ShowTimeContainer disabled={disabled}>
      <Calendar
        showWeekDays={false}
        firstDayOfWeek={1}
        selectedDays={dateChosen}
        onDayClick={onChange}
        disabledDays={disabledDays}
        fromMonth={new Date()}
        toMonth={showtimes.length ? new Date(showtimes.slice(-1)[0].date) : new Date()}
      />
      {showtimes.length
        ? <Time />
        : <Tip>Sorry, there&apos;re no showtimes for the film.</Tip>}
    </ShowTimeContainer>
  );
};

export default ShowTime;
