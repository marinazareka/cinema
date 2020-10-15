import styled from 'styled-components';
import { colors } from '../ui/Settings';
import { DisabledProps } from '../types/types';

export const Main = styled.main`
  display: flex; 
  flex-direction: column;
  min-height: calc(100vh);
`;

export const Info = styled.div`
  background-color: ${colors.light};
  display: flex;
  flex-wrap: wrap;
`;

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
    content: ${(props: DisabledProps) => (props.disabled ? 'no-open-quote' : 'inherit')};
    opacity: ${(props: DisabledProps) => (props.disabled ? 0.8 : 0)};
    position: absolute;
    width: 100%;
  }
`;
