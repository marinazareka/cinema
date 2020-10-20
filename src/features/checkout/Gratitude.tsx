import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getShowChosen, toggleShowTime } from '../showtime/showtimeSlice';
import { toggleSeatChoice } from '../seatchoice/seatChoiceSlice';
import { getUserData, resetStep } from './checkoutSlice';
import { Confirm, GratitudeBlock, Reservation } from './styled';

const Gratitude: FunctionComponent = () => {
  dayjs.extend(localizedFormat);
  const dispatch = useDispatch();
  const { name, mail } = useSelector(getUserData);
  const { time, hall, cinema, address } = useSelector(getShowChosen);

  const resetDisabling = () => {
    dispatch(resetStep());
    dispatch(toggleShowTime());
    dispatch(toggleSeatChoice());
  };

  return (
    <GratitudeBlock>
      <p>{`Thank you, ${name}!`}</p>
      <p>{`Please, check your e-mail ${mail} for the payment link.`}</p>
      <p>Your reservation:</p>
      <Reservation>
        <p>
          {`Cinema: ${cinema}`}
        </p>
        <p>
          {`Hall: ${hall}`}
        </p>
        <p>
          {`Address: ${address}`}
        </p>
        <p>
          {'Time: '}
          <time dateTime={time}>
            {dayjs(time).format('lll')}
          </time>
        </p>
      </Reservation>
      <p>We pay your attention to the covid-19 prevention methods and inform you to wear a medicine mask.</p>
      <Confirm type="button" onClick={resetDisabling}>Choose another tickets</Confirm>
    </GratitudeBlock>
  );
};

export default React.memo(Gratitude);
