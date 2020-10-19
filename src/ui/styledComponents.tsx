import styled, { css } from 'styled-components';
import { colors } from './Settings';
import { DisabledProps, SeatType } from '../types/types';

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

export const AbsoluteLayout = css`
  height: 100%;
  position: absolute;
  width: 100%;
`;

export const DisablingContainer = styled.div`
  &::after {
    ${AbsoluteLayout}
    content: ${(props: DisabledProps) => (props.disabled ? 'no-open-quote' : 'inherit')};
  }
`;

export const OpacityStyles = css`
  background-color: ${colors.light};
  opacity: ${(props: DisabledProps) => (props.disabled ? 0.8 : 0)};
`;
