import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Main, Info, SeatChoiceContainer } from './styled';
import Film from '../features/film/Film';
import ShowTime from '../features/showtime/Showtime';
import SeatChoice from '../features/seatchoice/SeatChoice';
import Checkout from '../features/checkout/Checkout';
import { isSeatsChoiceDisabled } from '../features/seatchoice/seatChoiceSlice';

const Layout: FunctionComponent = () => {
  const disabled = useSelector(isSeatsChoiceDisabled);

  return (
    <Main>
      <Info>
        <Film />
        <ShowTime />
      </Info>
      <SeatChoiceContainer disabled={disabled}>
        <SeatChoice />
        <Checkout />
      </SeatChoiceContainer>
    </Main>
  );
};

export default Layout;
