import styled from 'styled-components';
import { colors } from '../../../ui/Settings';

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
