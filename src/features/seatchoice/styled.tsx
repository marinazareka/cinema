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
    content: '';
    height: 100%;
    opacity: ${(props: SeatChoiceProps) => (props.disabled ? 0.8 : 0)};
    position: absolute;
    width: 100%;
  }
`;

export const Cinema = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 950px;
  overflow: auto;
  color: ${colors.light};
  padding: 24px 48px;

  @media screen and (max-width: 968px) {
    justify-content: flex-start;
    min-width: 100%;
  }
`;

export const Hall = styled.div`
  align-items: center;
  color: ${colors.light};
  display: flex;
  flex-direction: column;
  padding: 24px 48px;
`;

export const Screen = styled.div`
  background: linear-gradient(to bottom, ${colors.darkOpacity}, transparent);
  border: 2px solid ${colors.light};
  height: 36px;
  margin-bottom: 24px;
  transform: perspective(450px) rotateX(40deg);
  width: 380px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  width: 850px;
`;

export const RowSymbol = styled.span`
  font-size: 14px;
  line-height: 24px;
  width: 1em;
`;

interface SeatProps {
  active?: boolean;
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

  background-color: ${(props: SeatProps) => (props.active ? colors.light : 'transparent')};
  color: ${(props: SeatProps) => (props.active ? colors.dark : 'inherit')};
  font-weight: ${(props: SeatProps) => props.active && 700};
  width: ${(props: SeatProps) => SeatTypeWidth[props.seatType]};
  
  &[disabled] {
    background-color: ${colors.seatReserved};
    border-color: ${colors.seatReserved};
    color: ${colors.seatReservedText};
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

export const SeatHint = styled.div`
  background-color: ${colors.light};
  bottom: 136%;
  left: -1px;
  padding: 4px;
  position: absolute;
  visibility: hidden;
  z-index: 1;
  width: 104px;

  &::before {
    border-color: ${colors.light} transparent transparent;
    border-style: solid;
    border-width: 5px;
    content: '';
    left: 15%;
    margin-left: -5px;
    position: absolute;
    top: 100%;
  }

  &::after {
    border: 1px solid ${colors.dark};
    bottom: 4px;
    content: '';
    display: block;
    left: 4px;
    pointer-events: none;
    position: absolute;
    right: 4px;
    top: 4px;
  }

  span {
    color: ${colors.dark};
    display: block;
    font-size: 12px;
    line-height: 20px;
    text-align: unset;
  }
`;

export const Legend = styled(Row)`
  margin: 8px 0;
  width: auto;
  
  span {
    font-size: 14px;
    line-height: 26px;
    padding: 0 8px;
  }
`;

export const Checkout = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 24px 0 48px;
`;
