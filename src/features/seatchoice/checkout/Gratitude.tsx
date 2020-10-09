import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getDateChosen } from '../../showtime/showtimeSlice';
import { getUserData } from './checkoutSlice';

const Gratitude: FunctionComponent = () => {
  const { name, mail } = useSelector(getUserData);
  const date = useSelector(getDateChosen);
  dayjs.extend(localizedFormat);
  return (
    <div>
      <p>{`Thank you, ${name}!`}</p>
      <p>
        {`Please, check your e-mail ${mail} for the payment link.`}
      </p>
      <p>
        {'We are waiting you at the cinema BLABLABLA '}
        <time dateTime={date.toDateString()}>
          {dayjs(date).format('lll')}
        </time>
      </p>
      <p>We pay your attention to the covid-19 prevention methods and inform you to wear a medicine mask</p>
    </div>
  );
};

export default Gratitude;
