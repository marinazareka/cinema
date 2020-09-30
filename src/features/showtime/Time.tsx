import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { getAvailableTime, Show, setShowChoosen, getDateChoosen } from './showtimeSlice';
import { TimeButton, TimeContainer, Tip } from './styled';

const Time: FunctionComponent = () => {
  const dispatch = useDispatch();
  const times = useSelector(getAvailableTime);
  const timeChoosen = useSelector(getDateChoosen);

  function onChange(show: Show) {
    dispatch(setShowChoosen(show));
  }

  return (
    <TimeContainer>
      {times.length && (
        <>
          <Tip>
            Showtimes:
          </Tip>
          <>
            {times.map((show) => (
              <TimeButton
                key={show.time}
                active={dayjs(show.time).isSame(dayjs(timeChoosen))}
                type="button"
                disabled={dayjs().isAfter(dayjs(show.time))}
                onClick={() => onChange(show)}
              >
                {dayjs(show.time).format('HH:mm')}
              </TimeButton>
            ))}
          </>
        </>
      )}
    </TimeContainer>
  );
};

export default Time;
