import styled from 'styled-components';
import DayPicker from 'react-day-picker';
import { colors } from '../../ui/Settings';
import { DisablingContainer } from '../../ui/styledComponents';

export const ShowTimeContainer = styled(DisablingContainer)`
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

export const Calendar = styled(DayPicker)`
  .DayPicker {
    &-wrapper {
      position: relative;
      flex-direction: row;
      padding-bottom: 1em;
      user-select: none;
    }

    &-Months {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &-Week {
      display: flex;
    }

    &-Day {
      border: 1px solid ${colors.light};
      color: ${colors.light};
      height: 32px;
      line-height: 32px;
      margin: 4px;
      text-align: center;
      width: 32px;
      cursor: pointer;

      &--disabled {
        background-color: ${colors.dateDisable};
        border-color: ${colors.dateDisable};
        cursor: default;
      }    
    
      &--outside {
        border-color: transparent;
        background-color: transparent;
        cursor: default;
      }

      &:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover,
      &--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        background-color: ${colors.light};
        color: ${colors.darkBlue};
      }
    }

    &-NavButton {
      position: absolute;
      right: 0.5em;
      left: auto;
      display: inline-block;
      margin-top: 2px;
      width: 1.25em;
      height: 1.25em;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
      color: #8B9898;
      cursor: pointer;

      &--interactionDisabled {
        display: none;
      }

      &--next {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==')
      }

      &--prev {
        margin-right: 1.5em;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC');
      }
    }

    &-Caption {
      margin-bottom: 0.5em;
      padding: 0 0.5em;
      text-align: left;

      & > div {
        font-weight: 500;
        font-size: 1.15em;
      }
    }
  }
`;

export const TimeContainer = styled.div`
  min-height: 24px;
`;

export const Tip = styled.div`
  display: inline-block;
  line-height: 24px;
  padding-left: 4px;
`;

interface TimeButtonProps {
  active: boolean;
}

export const TimeButton = styled.button`
  border: 1px solid ${colors.light};
    cursor: pointer;
    display: inline-block;
    margin: 0 4px;
    padding: 4px;
    font-size: inherit;
    background: none;
    background-color: ${(props: TimeButtonProps) => props.active && colors.light};
    color: ${(props: TimeButtonProps) => (props.active ? colors.darkBlue : 'inherit')};

    &:not[disabled]:hover {
      background-color: ${colors.light};
      color: ${colors.darkBlue};
    }

    &[disabled] {
      background-color: ${colors.dateDisable};
      border-color: ${colors.dateDisable};
      cursor: default;
    }
`;
