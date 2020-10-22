import styled from 'styled-components';
import { colors } from '../../ui/Settings';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 24px 0 48px;
`;

export const CheckoutBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${colors.darkOpacity};
  border: 2px solid ${colors.light};
  color: ${colors.light};
  min-height: 410px;
  padding: 32px;
  position: relative;
  width: 300px;

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
  font-size: 12px;
  line-height: 16px;
  margin-left: 4px;
`;

export const Calculation = styled.span`
  padding-left: 8px;
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

export const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ArrowButton = styled.button`
  appearance: none;
  background-color: transparent;
  color: ${colors.light};
  border: 1px solid;
  width: 26px;
  height: 26px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.light};
    color: ${colors.dark};
  }
`;

export const Delimeter = styled.hr`
  margin: 16px 0;
`;

export const Label = styled.label`
  padding-bottom: 8px;
`;

export const Input = styled.input`
  height: 26px;
  background-color: ${colors.light};
  border: none;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
`;

export const GratitudeBlock = styled.div`
  & > p {
    padding-bottom: 8px;
    word-break: break-all;
  }

  button {
    margin-top: 8px;
  }
`;

export const Reservation = styled.div`
  border-left: 1px solid ${colors.white};
  padding-left: 8px;
  margin: 0 0 16px 16px;

  & > p {
    padding-bottom: 8px;

    &:last-child {
      padding-bottom: 0;
    }
  }
`;
