import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getDateChosen, toggleShowTime } from '../showtime/showtimeSlice';
import { toggleSeatChoice } from '../seatchoice/seatChoiceSlice';
import { getUserData, resetStep } from './checkoutSlice';
import { Confirm } from './styled';

const Gratitude: FunctionComponent = () => {
  dayjs.extend(localizedFormat);
  const dispatch = useDispatch();
  const { name, mail } = useSelector(getUserData);
  const date = useSelector(getDateChosen);

  const resetDisabling = () => {
    dispatch(resetStep());
    dispatch(toggleShowTime());
    dispatch(toggleSeatChoice());
  };

  return (
    <div>
      <p>{`Thank you, ${name}!`}</p>
      <p>{`Please, check your e-mail ${mail} for the payment link.`}</p>
      <p>
        {'We are waiting you at the cinema BLABLABLA '}
        <time dateTime={date.toDateString()}>
          {dayjs(date).format('lll')}
        </time>
      </p>
      <p>We pay your attention to the covid-19 prevention methods and inform you to wear a medicine mask</p>
      <Confirm type="button" onClick={resetDisabling}>Choose another tickets</Confirm>
    </div>
  );
};

export default Gratitude;
