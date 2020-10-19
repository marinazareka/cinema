import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { SeatChoiceContainer } from './styled';
import SeatChoice from '../features/seatchoice/SeatChoice';
import Checkout from '../features/checkout/Checkout';
import { isSeatsChoiceDisabled } from '../features/seatchoice/seatChoiceSlice';

const SeatsLayout: FunctionComponent = () => {
  const seatsDisabled = useSelector(isSeatsChoiceDisabled);

  return (
    <SeatChoiceContainer disabled={seatsDisabled}>
      <SeatChoice />
      <Checkout />
    </SeatChoiceContainer>
  );
};

export default SeatsLayout;
