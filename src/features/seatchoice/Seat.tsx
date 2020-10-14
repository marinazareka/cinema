import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirusSlash } from '@fortawesome/free-solid-svg-icons';
import { SeatHint } from './styled';
import { Seat } from '../../ui/styledComponents';
import {
  Seat as SeatI,
  toggleSeatChosen
} from './seatChoiceSlice';

interface Props {
  seat: SeatI;
  disabled: boolean;
  chosen: boolean;
  index: number;
  row: string
}

const SeatComponent: FunctionComponent<Props> = ({ seat, disabled, chosen, index, row }) => {
  const { id, type, price } = seat;

  const dispatch = useDispatch();
  const onChange = (seatChosen: SeatI) => {
    dispatch(toggleSeatChosen(seatChosen));
  };

  return (
    <Seat
      key={id}
      seatType={type}
      disabled={disabled}
      chosen={chosen}
      onClick={() => onChange(seat)}
      type="button"
    >
      {seat.disabled ? (
        <FontAwesomeIcon icon={faVirusSlash} />
      ) : (
        <>
          {index}
          <SeatHint className="hint">
            <span>{`seat ${index}${row}`}</span>
            <span>{`${type}, ${price} £`}</span>
          </SeatHint>
        </>
      )}
    </Seat>
  );
};

export default SeatComponent;
