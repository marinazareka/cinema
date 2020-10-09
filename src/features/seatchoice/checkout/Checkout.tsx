import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Container, CheckoutBlock, ButtonsBlock, ArrowButton } from './styled';
import TotalBlock from './TotalBlock';
import Form from './Form';
import Gratitude from './Gratitude';
import { getStep, nextStep, prevStep } from './checkoutSlice';
import { areSeatsChosen } from '../seatChoiceSlice';

enum CheckoutStep {
  Total = 0,
  Form = 1,
  Gratitude = 2
}

const Checkout: FunctionComponent = () => {
  const step = useSelector(getStep);
  const dispatch = useDispatch();
  const seatsChosen = useSelector(areSeatsChosen);

  return (
    <Container>
      <CheckoutBlock>
        {step === CheckoutStep.Total && <TotalBlock />}
        {step === CheckoutStep.Form && <Form />}
        {step === CheckoutStep.Gratitude && <Gratitude />}

        <ButtonsBlock>
          {step === CheckoutStep.Form && (
            <ArrowButton type="button" onClick={() => dispatch(prevStep())} title="Previous">
              <FontAwesomeIcon icon={faArrowLeft} />
            </ArrowButton>
          )}
          {seatsChosen && step < CheckoutStep.Form && (
            <ArrowButton type="button" onClick={() => dispatch(nextStep())} title="Next">
              <FontAwesomeIcon icon={faArrowRight} />
            </ArrowButton>
          )}
        </ButtonsBlock>
      </CheckoutBlock>
    </Container>
  );
};

export default Checkout;
