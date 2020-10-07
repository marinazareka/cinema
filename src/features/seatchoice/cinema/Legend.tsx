import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirusSlash } from '@fortawesome/free-solid-svg-icons';
import { Legend } from './styled';
import { Seat } from '../styled';
import { SeatType, SeatTypeTitle } from '../seatChoiceSlice';

const LegendComponent: FunctionComponent = () => (
  <>
    <Legend>
      <Seat disabled sample seatType={SeatType.Single} />
      <span>{SeatTypeTitle.single}</span>
      <Seat disabled sample seatType={SeatType.Double} />
      <span>{SeatTypeTitle.double}</span>
      <Seat disabled sample seatType={SeatType.Triple} />
      <span>{SeatTypeTitle.triple}</span>
    </Legend>
    <Legend>
      <Seat disabled seatType={SeatType.Single}>
        <FontAwesomeIcon icon={faVirusSlash} />
      </Seat>
      <span>disabled due to covid-19 prevention</span>
      <Seat type="button" disabled seatType={SeatType.Single} />
      <span>occupied</span>
      <Seat type="button" sample disabled chosen seatType={SeatType.Single} />
      <span>your choice</span>
    </Legend>
  </>
);

export default LegendComponent;
