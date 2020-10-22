import styled from 'styled-components';
import { colors } from '../ui/Settings';
import { DisablingContainer, OpacityStyles, AbsoluteLayout } from '../ui/styledComponents';

export const Main = styled.main`
  display: flex; 
  flex-direction: column;
  min-height: calc(100vh);
  position: relative;
`;

export const Info = styled.div`
  background-color: ${colors.light};
  display: flex;
  flex-wrap: wrap;
  min-height: 366px;
`;

export const SeatChoiceContainer = styled(DisablingContainer)`
  align-items: center;
  background-color: ${colors.dark};
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  position: relative;

  &::after {
    ${OpacityStyles}
  }
`;

export const Loading = styled.div`
  ${AbsoluteLayout}
  ${OpacityStyles}
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  text-align: center;
  padding-top: 14%;

  svg {
    font-size: 26px;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export const LoadingInfo = styled.p`
  padding-top: 8px;
  line-height: 24px;
  max-width: 235px;
`;
