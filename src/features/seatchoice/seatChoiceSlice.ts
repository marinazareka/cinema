import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';
import { Reservation, SeatType, Status } from '../../types/types';

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
  disabled: boolean;
  status: Status;
}

export interface GroupedSeats {
  type: SeatType;
  seats: Array<Seat>;
}

interface Occupied {
  date: string;
  occupied: Array<number>;
}

const initialState: State = { rows: [], occupied: [], seatsChosen: [], disabled: false, status: Status.Idle };

export const fetchSeats = createAsyncThunk('seatchoice/fetchSeats', async () => {
  const response = await axios.get('/seats');
  return response.data as Array<Row>;
});

export const fetchSeatsOccupied = createAsyncThunk('seatchoice/fetchSeatsOccupied', async (showId: number) => {
  const occupiedResponse = await axios.get(`/occupied?showId=${showId}`);
  const occupied = occupiedResponse.data as Array<Occupied>;
  const reservedResponse = await axios.get(`/reserved?showId=${showId}`);
  const reserved = reservedResponse.data as Array<Reservation>;
  const activeReserved = reserved.filter((res: Reservation) => dayjs().isBefore(dayjs(res.until)));
  return [
    ...(occupied.length ? occupied[0].occupied : []),
    ...activeReserved.reduce((prev: Array<number>, curr) => [...prev, ...curr.seatsIds], []),
  ];
});

const seatChoiceSlice = createSlice({
  name: 'seatChoice',
  initialState,
  reducers: {
    resetChosen: (state) => {
      state.seatsChosen = [];
    },
    resetSeats: (state) => {
      state.status = Status.Idle;
      state.occupied = [];
      state.seatsChosen = [];
    },
    toggleSeatChosen: (state, action: PayloadAction<Seat>) => {
      const index = state.seatsChosen.findIndex((i) => i.id === action.payload.id);
      if (index > -1) {
        state.seatsChosen.splice(index, 1);
      } else {
        state.seatsChosen.push(action.payload);
      }
    },
    addReserved: (state, action: PayloadAction<Array<number>>) => {
      state.seatsChosen = [];
      state.occupied = [...state.occupied, ...action.payload];
    },
    toggleSeatChoice: (state) => {
      state.disabled = !state.disabled;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeats.fulfilled, (state, action: PayloadAction<Array<Row>>) => {
      state.rows = action.payload;
    });
    builder.addCase(fetchSeatsOccupied.fulfilled, (state, action: PayloadAction<Array<number>>) => {
      state.status = Status.Complete;
      state.occupied = action.payload;
    });
    builder.addCase(fetchSeatsOccupied.rejected, (state) => {
      state.status = Status.Failed;
    });
  },
});

export const { resetChosen, resetSeats, toggleSeatChosen, addReserved, toggleSeatChoice } = seatChoiceSlice.actions;
export const getSeats = (state: RootState): Array<Row> => state.seatchoice.rows;
export const getDisabled = (state: RootState): boolean => state.seatchoice.disabled;
export const getSeatsOccupied = (state: RootState): Array<number> => state.seatchoice.occupied;
export const isSeatsChoiceDisabled = (state: RootState): boolean => state.seatchoice.status !== Status.Complete;
export const getSeatsChosen = (state: RootState): Array<Seat> => state.seatchoice.seatsChosen;
export const areSeatsChosen = (state: RootState): boolean => !!state.seatchoice.seatsChosen.length;
export const getSeatsChosenIds = (state: RootState): Array<number> => state.seatchoice.seatsChosen
  .map((seat) => seat.id);
export const getGroupedSeatsChosen = (state: RootState): Array<GroupedSeats> => Object.values(SeatType).map((type) => ({
  type,
  seats: state.seatchoice.seatsChosen.filter((seat) => seat.type === type),
}));
export default seatChoiceSlice.reducer;
