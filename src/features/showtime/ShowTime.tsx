import React, { FunctionComponent, useState } from 'react';
import { DayModifiers } from 'react-day-picker';
import { ShowTimeContainer, Calendar } from './styled';
// import 'react-day-picker/lib/style.css';

const ShowTime: FunctionComponent = () => {
  const date = new Date();
  const maxDate = new Date(date.setMonth(date.getMonth() + 1));
  const [value, setValue] = useState(new Date());

  function onChange(day: Date, modifiers: DayModifiers) {
    if (modifiers.disabled) {
      return;
    }
    console.log(modifiers.selected ? undefined : day);
    if (modifiers.selected) {
      setValue(day);
    }
  }
  return (
    <ShowTimeContainer>
      <Calendar
        showWeekDays={false}
        selectedDays={value}
        onDayClick={onChange}
        disabledDays={[
          {
            before: new Date(),
            after: maxDate,
          },
        ]}
        fromMonth={new Date()}
        toMonth={maxDate}
      />
    </ShowTimeContainer>
  );
};

export default ShowTime;
