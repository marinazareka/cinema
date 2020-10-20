import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirusSlash } from '@fortawesome/free-solid-svg-icons';
import { Legend } from './styled';
import { Seat } from '../../ui/styledComponents';
import { SeatType, SeatTypeTitle } from '../../types/types';

const LegendComponent: FunctionComponent = () => (
  <>
    <Legend>
      <Seat disabled sample seatType={SeatType.Single} title={SeatTypeTitle.single} />
      <span>{SeatTypeTitle.single}</span>
      <Seat disabled sample seatType={SeatType.Double} title={SeatTypeTitle.double} />
      <span>{SeatTypeTitle.double}</span>
      <Seat disabled sample seatType={SeatType.Triple} title={SeatTypeTitle.triple} />
      <span>{SeatTypeTitle.triple}</span>
    </Legend>
    <Legend>
      <Seat disabled seatType={SeatType.Single} title="disabled due to covid-19 prevention">
        <FontAwesomeIcon icon={faVirusSlash} />
      </Seat>
      <span>disabled due to covid-19 prevention</span>
      <Seat type="button" disabled seatType={SeatType.Single} title="occupied" />
      <span>occupied</span>
      <Seat type="button" sample disabled chosen seatType={SeatType.Single} title="your choice" />
      <span>your choice</span>
    </Legend>
  </>
);

export default React.memo(LegendComponent);
