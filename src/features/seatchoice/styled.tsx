import styled from 'styled-components';
import { colors } from '../../ui/Settings';
import { SeatType } from './seatChoiceSlice';

interface SeatChoiceProps {
  disabled: boolean;
}

export const SeatChoiceContainer = styled.div`
  align-items: center;
  background-color: ${colors.dark};
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  position: relative;

  &::after {
    background-color: ${colors.light};
    height: 100%;
    /* content: ''; */
    opacity: ${(props: SeatChoiceProps) => (props.disabled ? 0.8 : 0)};
    position: absolute;
    width: 100%;
  }
`;

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
