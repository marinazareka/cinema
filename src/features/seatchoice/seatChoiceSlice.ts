import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import http from '../../http';
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
  seats: Seat[];
}

interface State {
  rows: Row[];
  occupied: number[];
  seatsChosen: Seat[];
  disabled: boolean;
  seatsStatus: Status;
  occupiedStatus: Status;
}

export interface GroupedSeats {
  type: SeatType;
  seats: Seat[];
}

interface Occupied {
  date: string;
  occupied: number[];
}

const initialState: State = {
  rows: [],
  occupied: [],
  seatsChosen: [],
  disabled: false,
  seatsStatus: Status.Idle,
  occupiedStatus: Status.Idle,
};

export const fetchSeats = createAsyncThunk('seatchoice/fetchSeats', async () => {
  const response = await http.get('/seats');
  return response.data as Row[];
});

export const fetchSeatsOccupied = createAsyncThunk('seatchoice/fetchSeatsOccupied', async (showId: number) => {
  const occupiedResponse = await http.get(`/occupied?showId=${showId}`);
  const occupied = occupiedResponse.data as Occupied[];
  const reservedResponse = await http.get(`/reserved?showId=${showId}`);
  const reserved = reservedResponse.data as Reservation[];
  const activeReserved = reserved.filter((res: Reservation) => dayjs().isBefore(dayjs(res.until)));
  return [
    ...(occupied.length ? occupied[0].occupied : []),
    ...activeReserved.reduce((prev: number[], curr) => [...prev, ...curr.seatsIds], []),
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
      state.occupiedStatus = Status.Idle;
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
    addReserved: (state, action: PayloadAction<number[]>) => {
      state.seatsChosen = [];
      state.occupied = [...state.occupied, ...action.payload];
    },
    toggleSeatChoice: (state) => {
      state.disabled = !state.disabled;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeats.fulfilled, (state, action: PayloadAction<Row[]>) => {
      state.rows = action.payload;
      state.seatsStatus = Status.Complete;
    });
    builder.addCase(fetchSeats.rejected, (state) => {
      state.seatsStatus = Status.Failed;
    });
    builder.addCase(fetchSeatsOccupied.fulfilled, (state, action: PayloadAction<number[]>) => {
      state.occupied = action.payload;
      state.occupiedStatus = Status.Complete;
    });
    builder.addCase(fetchSeatsOccupied.rejected, (state) => {
      state.occupiedStatus = Status.Failed;
    });
  },
});

export const { resetChosen, resetSeats, toggleSeatChosen, addReserved, toggleSeatChoice } = seatChoiceSlice.actions;
export const getSeatsStatus = (state: RootState): Status => state.seatchoice.seatsStatus;
export const getSeats = (state: RootState): Row[] => state.seatchoice.rows;
export const getDisabled = (state: RootState): boolean => state.seatchoice.disabled;
export const getSeatsOccupied = (state: RootState): number[] => state.seatchoice.occupied;
export const isSeatsChoiceDisabled = createSelector<RootState, Status, boolean>(
  (state) => state.seatchoice.occupiedStatus,
  (occupiedStatus) => occupiedStatus !== Status.Complete
);
export const getSeatsChosen = (state: RootState): Seat[] => state.seatchoice.seatsChosen;
export const areSeatsChosen = (state: RootState): boolean => !!state.seatchoice.seatsChosen.length;
export const getSeatsChosenIds = (state: RootState): number[] => state.seatchoice.seatsChosen
  .map((seat) => seat.id);
export const getGroupedSeatsChosen = (state: RootState): GroupedSeats[] => Object.values(SeatType).map((type) => ({
  type,
  seats: state.seatchoice.seatsChosen.filter((seat) => seat.type === type),
}));
export default seatChoiceSlice.reducer;
