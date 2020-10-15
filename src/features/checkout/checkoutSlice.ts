import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';
import { UserData, Reservation, ReservationData, Status } from '../../types/types';

export enum CheckoutStep {
  Total = 0,
  Form = 1,
  Gratitude = 2
}

interface State extends UserData {
  step: number;
  status: Status;
}

const initialState: State = { step: 0, name: '', mail: '', status: Status.Idle };

export const postReservation = createAsyncThunk<Reservation, ReservationData>(
  'seatchoice/postReservation',
  async (reservation) => {
    const response = await axios.post('/reserved', {
      ...reservation,
      until: dayjs().add(15, 'minute'),
    });
    return (await response.data) as Reservation;
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    resetStep: (state) => {
      state.step = 0;
    },
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

export const { nextStep, prevStep, resetStep } = checkoutSlice.actions;
export const getStep = (state: RootState): number => state.checkout.step;
export const getStatus = (state: RootState): Status => state.checkout.status;
export const getUserData = (state: RootState): UserData => ({ name: state.checkout.name, mail: state.checkout.mail });
export default checkoutSlice.reducer;
