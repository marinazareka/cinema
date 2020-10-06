import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { SeatChoiceContainer, Checkout } from './styled';
import CinemaHall from './CinemaHall';
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
