import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Container, CheckoutBlock, ButtonsBlock, ArrowButton } from './styled';
import TotalBlock from './TotalBlock';
import Form from './Form';
import Gratitude from './Gratitude';
import { getStep, nextStep, prevStep, CheckoutStep } from './checkoutSlice';
import { areSeatsChosen, toggleSeatChoice } from '../seatchoice/seatChoiceSlice';
import { toggleShowTime } from '../showtime/showtimeSlice';

const Checkout: FunctionComponent = () => {
  const step = useSelector(getStep);
  const dispatch = useDispatch();
  const seatsChosen = useSelector(areSeatsChosen);

  const nextClick = () => {
    dispatch(nextStep());
    dispatch(toggleSeatChoice());
    dispatch(toggleShowTime());
  };

  const prevClick = () => {
    dispatch(prevStep());
    dispatch(toggleSeatChoice());
    dispatch(toggleShowTime());
  };

  return (
    <Container>
      <CheckoutBlock>
        {step === CheckoutStep.Total && <TotalBlock />}
        {step === CheckoutStep.Form && <Form />}
        {step === CheckoutStep.Gratitude && <Gratitude />}

        <ButtonsBlock>
          {step === CheckoutStep.Form && (
            <ArrowButton type="button" onClick={prevClick} title="Previous step">
              <FontAwesomeIcon icon={faArrowLeft} />
            </ArrowButton>
          )}
          {seatsChosen && step === CheckoutStep.Total && (
            <ArrowButton type="button" onClick={nextClick} title="Next step">
              <FontAwesomeIcon icon={faArrowRight} />
            </ArrowButton>
          )}
        </ButtonsBlock>
      </CheckoutBlock>
    </Container>
  );
};

export default Checkout;
