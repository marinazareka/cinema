import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { RootState } from '../../../app/store';

export enum Status {
  Idle = 'idle',
  Pending = 'pending',
  Complete = 'complete',
  Failed = 'failed',
}

interface UserData {
  name: string;
  mail: string;
}

interface Res extends UserData {
  date: Date;
  seatsIds: Array<number>;
}

interface State extends UserData {
  step: number;
  status: Status;
}

export interface Response extends Res {
  id: number;
  until: string
}

const initialState: State = { step: 0, name: '', mail: '', status: Status.Idle };

export const postReservation = createAsyncThunk<Response, Res>(
  'seatchoice/postReservation',
  async (reservation) => {
    const response = await axios.post('/reserved', {
      ...reservation,
      date: dayjs(reservation.date).format('YYYY-MM-DDTHH:mm:ss'),
      until: dayjs().add(15, 'minute'),
    });
    return (await response.data) as Response;
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postReservation.fulfilled, (state, action) => {
      state.status = Status.Complete;
      state.name = action.payload.name;
      state.mail = action.payload.mail;
      state.step += 1;
    });
    builder.addCase(postReservation.pending, (state) => {
      state.status = Status.Pending;
    });
    builder.addCase(postReservation.rejected, (state) => {
      state.status = Status.Failed;
    });
  },
});

export const { nextStep, prevStep } = checkoutSlice.actions;
export const getStep = (state: RootState): number => state.checkout.step;
export const getStatus = (state: RootState): Status => state.checkout.status;
export const getUserData = (state: RootState): UserData => ({ name: state.checkout.name, mail: state.checkout.mail });
export default checkoutSlice.reducer;
