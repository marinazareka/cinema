import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DayModifiers } from 'react-day-picker';
import { ShowTimeContainer, Calendar } from './styled';
import { getAvailableShowTimes, getDateChoosen, setDateChoosen } from './showTimeSlice';

const ShowTime: FunctionComponent = () => {
  const dispatch = useDispatch();
  const showtimes = useSelector(getAvailableShowTimes);
  const [dateChoosen, setValue] = useState(useSelector(getDateChoosen));

  function onChange(day: Date, modifiers: DayModifiers) {
    if (modifiers.disabled) return;
    if (!modifiers.selected) {
      console.log(day);
      setValue(day);
      dispatch(setDateChoosen(day));
    }
  }
  return (
    <ShowTimeContainer>
      {showtimes.length
      && (
      <Calendar
        showWeekDays={false}
        selectedDays={dateChoosen}
        onDayClick={onChange}
        disabledDays={[
          ...showtimes.filter((i) => !i.shows.length).map((i) => new Date(i.date)),
          {
            before: new Date(showtimes[0].date),
            after: new Date(showtimes.slice(-1)[0].date),
          },
        ]}
        fromMonth={new Date()}
        toMonth={new Date(showtimes.slice(-1)[0].date)}
      />
      )}
    </ShowTimeContainer>
  );
};

export default ShowTime;
