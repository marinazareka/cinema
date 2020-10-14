import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Delimeter, Group, Label, Input, Confirm } from './styled';
import { getSeatsChosenIds, addReserved } from '../seatchoice/seatChoiceSlice';
import { getDateChosen } from '../showtime/showtimeSlice';
import { AppDispatch } from '../../index';

import { getStatus, postReservation } from './checkoutSlice';
import { Status } from '../../types/types';

const Form: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const date = useSelector(getDateChosen);
  const chosen = useSelector(getSeatsChosenIds);
  const status = useSelector(getStatus);

  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
  const onMailChanged = (e: React.ChangeEvent<HTMLInputElement>) => setUserMail(e.target.value);

  const saveReservation = async () => {
    const resultAction = await dispatch(postReservation({ name: userName, mail: userMail, date, seatsIds: chosen }));
    if (postReservation.fulfilled.match(resultAction)) {
      const response = unwrapResult(resultAction);
      dispatch(addReserved(response.seatsIds));
    }
  };

  return (
    <div>

      {status === Status.Failed ? (
        <p>
          Sorry, there was some error while saving your data.
          Try again, please.
        </p>
      ) : (
        <p>
          We will send a link for paying to your e-mail.
          Your seats are reserved for you for 15 minutes.
        </p>
      )}
      <Delimeter />
      <form>
        <Group>
          <Label htmlFor="name">Your name</Label>
          <Input type="text" id="name" name="name" value={userName} onChange={onNameChanged} required />
        </Group>
        <Group>
          <Label htmlFor="email">Your e-mail</Label>
          <Input type="email" id="email" name="email" value={userMail} onChange={onMailChanged} required />
        </Group>
        <Confirm type="submit" disabled={status === Status.Pending} onClick={saveReservation}>Confirm</Confirm>
      </form>
    </div>
  );
};

export default Form;
