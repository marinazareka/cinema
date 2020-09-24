import styled from 'styled-components';
import { colors } from '../ui/Settings';

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
