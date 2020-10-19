import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { SeatsSubtotal, Total } from './styled';
import { getGroupedSeatsChosen, getSeatsChosen } from '../seatchoice/seatChoiceSlice';
import SeatGroup from './SeatGroup';

const Checkout: FunctionComponent = () => {
  const seatGroup = useSelector(getGroupedSeatsChosen);
  const seatChosen = useSelector(getSeatsChosen);
  const total = seatChosen.reduce((sum, current) => sum + current.price, 0);

  return (
    <div>
      <div>
        Your choice
        <hr />
      </div>
      {seatChosen.length > 0 && (
        <>
          <SeatsSubtotal>
            {seatGroup.map((group) => (
              group.seats.length !== 0 && <SeatGroup key={group.type} group={group} />
            ))}
          </SeatsSubtotal>
          <hr />
          <Total>
            <span>{`Total: ${total}£`}</span>
          </Total>
        </>
      )}
    </div>
  );
};

export default Checkout;
