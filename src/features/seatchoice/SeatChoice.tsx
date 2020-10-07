import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { SeatChoiceContainer } from './styled';
import CinemaHall from './cinema/Hall';
import Checkout from './checkout/Checkout';
import { getSeatsOccupied } from './seatChoiceSlice';

const SeatChoice: FunctionComponent = () => {
  const disabled = !useSelector(getSeatsOccupied).length;

  return (
    <SeatChoiceContainer disabled={disabled}>
      <CinemaHall />
      <Checkout />
    </SeatChoiceContainer>
  );
};

export default SeatChoice;
