import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export enum SeatType {
  Single = 'single',
  Double = 'double',
  Triple = 'triple'
}

export interface Seat {
  id: number;
  price: number;
  type: SeatType;
  disabled?: boolean;
  occupied: boolean;
}

interface Row {
  row: string;
  seats: Array<Seat>;
}

interface State {
  rows: Array<Row>;
  occupied: Array<number>;
  seatsChosen: Array<Seat>;
}

const initialState: State = { rows: [], occupied: [], seatsChosen: [] };

export const fetchSeats = createAsyncThunk('seatchoice/fetchSeats', async () => {
  const response = await axios.get('/seats');
  return response.data as Array<Row>;
});

export const fetchSeatsOccupied = createAsyncThunk('seatchoice/fetchSeatsOccupied', async (date: string) => {
  const response = await axios.get(`/occupied?date=${date}`);
  return response.data[0].occupied as Array<number>;
});

const seatChoiceSlice = createSlice({
  name: 'seatChoice',
  initialState,
  reducers: {
    resetOccupied: (state) => {
      state.occupied = [];
    },
    toggleSeatChosen: (state, action: PayloadAction<Seat>) => {
      const index = state.seatsChosen.findIndex((i) => i.id === action.payload.id);
      if (index > -1) {
        state.seatsChosen.splice(index, 1);
      } else {
        state.seatsChosen.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeats.fulfilled, (state, action: PayloadAction<Array<Row>>) => {
      state.rows = action.payload;
    });
    builder.addCase(fetchSeatsOccupied.fulfilled, (state, action: PayloadAction<Array<number>>) => {
      state.occupied = action.payload;
    });
  },
});

export const { resetOccupied, toggleSeatChosen } = seatChoiceSlice.actions;
export const getSeats = (state: RootState): Array<Row> => state.seatchoice.rows;
export const getSeatsOccupied = (state: RootState): Array<number> => state.seatchoice.occupied;
export const getSeatsChosen = (state: RootState): Array<Seat> => state.seatchoice.seatsChosen;

export default seatChoiceSlice.reducer;
