import styled from 'styled-components';
import { colors } from '../../ui/Settings';

export const ShowTimeContainer = styled.div`
  align-items: center;
  background-color: ${colors.darkBlue};
  color: ${colors.light};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 32px 0;

  @media screen and (min-width: 580px) {
    padding: 32px 48px;
  }
`;
