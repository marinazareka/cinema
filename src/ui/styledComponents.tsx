import styled from 'styled-components';
import { colors } from './Settings';
import { SeatType } from '../types/types';

interface SeatProps {
  chosen?: boolean;
  sample?: boolean;
  seatType: SeatType;
}

enum SeatTypeWidth {
  single = '26px',
  double = '48px',
  triple = '72px'
}

export const Seat = styled.button`
  border: 1px solid ${colors.light};
  font-size: 12px;
  line-height: 26px;
  margin: 0 4px;
  position: relative;
  text-align: center;
  cursor: pointer;
  padding: 0;
  height: 26px;

  background-color: ${(props: SeatProps) => (props.chosen ? colors.light : 'transparent')};
  color: ${(props: SeatProps) => (props.chosen ? colors.dark : 'inherit')};
  font-weight: ${(props: SeatProps) => props.chosen && 700};
  width: ${(props: SeatProps) => SeatTypeWidth[props.seatType]};
  
  &[disabled] {
    border-color: ${(props: SeatProps) => (!props.sample && colors.seatReserved)};
    background-color: ${(props: SeatProps) => (!props.sample && colors.seatReserved)};
    cursor: default;
  }
  
  &:not([disabled]) {
    &:hover {
      background-color: ${colors.light};
      color: ${colors.dark};
      font-weight: 700;

      .hint {
        visibility: visible;
      }
    }
  }
`;