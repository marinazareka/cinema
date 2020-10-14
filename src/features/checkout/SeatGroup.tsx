import React, { FunctionComponent } from 'react';
import { TypeInfo } from './styled';
import { Seat } from '../../ui/styledComponents';
import { GroupedSeats } from '../seatchoice/seatChoiceSlice';
import { SeatTypeTitle } from '../../types/types';

interface Props {
  group: GroupedSeats;
}

const SeatGroup: FunctionComponent<Props> = ({ group }) => {
  const { type, seats } = group;

  return (
    <div>
      <div>
        <Seat disabled sample seatType={type} />
        <TypeInfo>{SeatTypeTitle[type]}</TypeInfo>
      </div>
      <span>
        {`× ${seats.length}`}
      </span>
      <span>
        {`= ${seats.reduce((sum, current) => sum + current.price, 0)}£`}
      </span>
    </div>
  );
};

export default SeatGroup;
