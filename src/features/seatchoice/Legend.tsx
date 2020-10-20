import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirusSlash } from '@fortawesome/free-solid-svg-icons';
import { Legend, LegendBlock, LegendSeat } from './styled';
import { SeatType, SeatTypeTitle } from '../../types/types';

const LegendComponent: FunctionComponent = () => (
  <>
    <Legend>
      <LegendBlock>
        <LegendSeat disabled sample seatType={SeatType.Single} title={SeatTypeTitle.single} />
        <span>{SeatTypeTitle.single}</span>
      </LegendBlock>
      <LegendBlock>
        <LegendSeat disabled sample seatType={SeatType.Double} title={SeatTypeTitle.double} />
        <span>{SeatTypeTitle.double}</span>
      </LegendBlock>
      <LegendBlock>
        <LegendSeat disabled sample seatType={SeatType.Triple} title={SeatTypeTitle.triple} />
        <span>{SeatTypeTitle.triple}</span>
      </LegendBlock>
    </Legend>
    <Legend>
      <LegendBlock>
        <LegendSeat disabled seatType={SeatType.Single} title="disabled due to covid-19 prevention">
          <FontAwesomeIcon icon={faVirusSlash} />
        </LegendSeat>
        <span>disabled due to covid-19 prevention</span>
      </LegendBlock>
      <LegendBlock>
        <LegendSeat type="button" disabled seatType={SeatType.Single} title="occupied" />
        <span>occupied</span>
      </LegendBlock>
      <LegendBlock>
        <LegendSeat type="button" sample disabled chosen seatType={SeatType.Single} title="your choice" />
        <span>your choice</span>
      </LegendBlock>
    </Legend>
  </>
);

export default React.memo(LegendComponent);
