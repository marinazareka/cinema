import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { getAvailableTime, Show, setShowChosen, getShowIdChosen } from './showtimeSlice';
import { fetchSeatsOccupied, resetChosen } from '../seatchoice/seatChoiceSlice';
import { TimeButton, TimeContainer, Tip } from './styled';

const Time: FunctionComponent = () => {
  const dispatch = useDispatch();
  const times = useSelector(getAvailableTime);
  const showIdChosen = useSelector(getShowIdChosen);

  const onChange = (show: Show) => {
    dispatch(setShowChosen(show));
    dispatch(resetChosen());
    dispatch(fetchSeatsOccupied(show.id));
  };

  return (
    <TimeContainer>
      {times.length ? (
        <>
          <Tip>
            Showtimes:
          </Tip>
          <>
            {times.map((show) => (
              <TimeButton
                key={show.id}
                active={show.id === showIdChosen}
                type="button"
                disabled={dayjs().isAfter(dayjs(show.time))}
                onClick={() => onChange(show)}
              >
                {dayjs(show.time).format('HH:mm')}
              </TimeButton>
            ))}
          </>
        </>
      ) : (
        <Tip>Please select a date to find the showtimes.</Tip>
      )}
    </TimeContainer>
  );
};

export default Time;
