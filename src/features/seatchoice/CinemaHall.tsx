import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirusSlash } from '@fortawesome/free-solid-svg-icons';
import { Cinema, Screen, Row, RowSymbol, Seat, SeatHint, Legend } from './styled';
import { getSeats, getSeatsOccupied, SeatType } from './seatChoiceSlice';

const CinemaHall: FunctionComponent = () => {
  const rows = useSelector(getSeats);
  const occupied = useSelector(getSeatsOccupied);

  return (
    <Cinema>
      <Screen />
      {rows.map((row) => (
        <Row key={row.row}>
          <RowSymbol>{row.row}</RowSymbol>
          <div className="seats">
            {row.seats.map((seat, index) => (
              <Seat
                key={seat.id}
                seatType={seat.type}
                disabled={seat.disabled || occupied.some((i) => i === seat.id)}
                type="button"
              >
                {seat.disabled ? (
                  <FontAwesomeIcon icon={faVirusSlash} />
                ) : (
                  <>
                    {index + 1}
                    <SeatHint className="hint">
                      <span>{`seat ${index + 1}${row.row}`}</span>
                      <span>{`${seat.type}, ${seat.price} £`}</span>
                    </SeatHint>
                  </>
                )}
              </Seat>
            ))}
          </div>
          <RowSymbol>{row.row}</RowSymbol>
        </Row>
      ))}
      <Legend>
        <Seat disabled seatType={SeatType.Single} />
        <span>armchair</span>
        <Seat disabled seatType={SeatType.Double} />
        <span>2-seat sofa</span>
        <Seat disabled seatType={SeatType.Triple} />
        <span>3-seat sofa</span>
      </Legend>
      <Legend>
        <Seat disabled seatType={SeatType.Single}>
          <FontAwesomeIcon icon={faVirusSlash} />
        </Seat>
        <span>disabled due to covid-19 prevention</span>
        <Seat type="button" disabled seatType={SeatType.Single} />
        <span>occupied</span>
        <Seat type="button" disabled active seatType={SeatType.Single} />
        <span>your choice</span>
      </Legend>
    </Cinema>
  );
};

export default CinemaHall;
