import styled from 'styled-components';
import { colors } from '../../ui/Settings';

export const FilmContainer = styled.div`
  display: flex;
  flex: 3;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 32px;
`;

export const Poster = styled.div`
  padding-right: 32px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 72%;

  @media screen and (max-width: 1280px) {
    text-align: center;
    align-items: center;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  line-height: 30px;
  margin: 16px 0;
`;

export const Description = styled.p`
  max-width: 82%;
  padding-bottom: 16px;
  line-height: 22px;
  border-bottom: 1px solid ${colors.textGray};
  margin-bottom: 16px;
`;

export const Detail = styled.span`
  color: ${colors.textGrayDark};
  font-size: 14px;
  padding: 8px 8px 8px 0;

  svg {
    padding-right: 4px;
  }
`;
