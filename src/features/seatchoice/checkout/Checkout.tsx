import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Container, CheckoutBlock, SeatsSubtotal, Total, Confirm } from './styled';
import { getGroupedSeatsChosen, getSeatsChosen } from '../seatChoiceSlice';
import SeatGroup from './SeatGroup';

const alertCheckout = () => {
  // eslint-disable-next-line no-alert
  console.log('alert');
};

const Checkout: FunctionComponent = () => {
  const seatGroup = useSelector(getGroupedSeatsChosen);
  const seatChosen = useSelector(getSeatsChosen);
  const total = seatChosen.reduce((sum, current) => sum + current.price, 0);

  return (
    <Container>
      <CheckoutBlock>
        <div>Your choice</div>
        <hr />
        {total > 0 && (
        <>
          <SeatsSubtotal>
            {seatGroup.map((group) => (
              group.seats.length !== 0 && <SeatGroup group={group} />
            ))}
          </SeatsSubtotal>
          <hr />
          <Total>
            <span>{`Total: ${total}£`}</span>
            <Confirm type="button" onClick={() => alertCheckout()}>Confirm</Confirm>
          </Total>
        </>
        )}
      </CheckoutBlock>
    </Container>
  );
};

export default Checkout;
