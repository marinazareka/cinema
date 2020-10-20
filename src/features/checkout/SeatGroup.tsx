import React, { FunctionComponent } from 'react';
import { TypeInfo, Calculation } from './styled';
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
      <Calculation>
        {`× ${seats.length} = ${seats.reduce((sum, current) => sum + current.price, 0)}£`}
      </Calculation>
    </div>
  );
};

export default React.memo(SeatGroup);
