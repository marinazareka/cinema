import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Cinema, Screen, Row, RowSymbol } from './styled';
import {
  getSeats, getSeatsOccupied,
  getSeatsChosen
} from '../seatChoiceSlice';
import Seat from './Seat';
import LegendComponent from './Legend';

const Hall: FunctionComponent = () => {
  const rows = useSelector(getSeats);
  const occupied = useSelector(getSeatsOccupied);
  const chosen = useSelector(getSeatsChosen);

  return (
    <Cinema>
      <Screen />
      {rows.map((row) => (
        <Row key={row.row}>
          <RowSymbol>{row.row}</RowSymbol>
          <div>
            {row.seats.map((seat, index) => (
              <Seat
                seat={seat}
                disabled={seat.disabled || occupied.some((i) => i === seat.id)}
                chosen={chosen.some((i) => i.id === seat.id)}
                index={index + 1}
                row={row.row}
              />
            ))}
          </div>
          <RowSymbol>{row.row}</RowSymbol>
        </Row>
      ))}
      <LegendComponent />
    </Cinema>
  );
};

export default Hall;
