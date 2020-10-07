import styled from 'styled-components';
import { colors } from '../../../ui/Settings';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 24px 0 48px;

  /* .seat-amount {
    min-width: 64px;
  } 
    .warning {
      font-size: 12px;
      line-height: 14px;
      padding-top: 8px;
    } */
`;

export const CheckoutBlock = styled.div`
  background-color: ${colors.darkOpacity};
  border: 2px solid ${colors.light};
  color: ${colors.light};
  min-height: 300px;
  padding: 32px;
  position: relative;
  width: 260px;

  @media screen and (max-width: 320px) {
    padding: 12px;
    width: 82%;
  }

  &::before {
    border: 1px solid ${colors.light};
    bottom: 4px;
    content: '';
    display: block;
    left: 4px;
    pointer-events: none;
    position: absolute;
    right: 4px;
    top: 4px;
  }
`;

export const SeatsSubtotal = styled.div`
  padding: 16px 0;

  & > div {
    display: flex;
    line-height: 26px;
    margin: 8px 0;
    padding-right: 32px;

    & > div {
      min-width: 80px;
    }
  }
`;

export const TypeInfo = styled.span`
  display: block;
  font-size: 10px;
  line-height: 16px;
  margin: 0 4px;
`;

export const Total = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
`;

export const Confirm = styled.button`
  background-color: ${colors.light};
  border: 2px solid ${colors.light};
  box-shadow: none;
  color: ${colors.dark};
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 16px;
  position: relative;
  text-align: right;

  &::before {
    border: 1px solid;
    bottom: 1px;
    content: '';
    display: block;
    left: 1px;
    pointer-events: none;
    position: absolute;
    right: 1px;
    top: 1px;
  }

  &:hover {
    background-color: ${colors.darkOpacity};
    color: ${colors.light};
    text-decoration: none;

    &::before {
      border: 0;
    }
  }
`;
