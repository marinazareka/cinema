import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DayModifiers } from 'react-day-picker';
import { ShowTimeContainer, Calendar } from './styled';
import { getAvailableShowTimes, getDateChoosen, setDateChoosen } from './showTimeSlice';
import Time from './Time';

const ShowTime: FunctionComponent = () => {
  const dispatch = useDispatch();
  const showtimes = useSelector(getAvailableShowTimes);
  const dateChoosen = useSelector(getDateChoosen);

  function onChange(day: Date, modifiers: DayModifiers) {
    if (modifiers.disabled) return;
    if (!modifiers.selected) {
      dispatch(setDateChoosen(day.toISOString()));
    }
  }

  return (
    <ShowTimeContainer>
      {showtimes.length
      && (
        <>
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
          <Time />
        </>
      )}
    </ShowTimeContainer>
  );
};

export default ShowTime;
