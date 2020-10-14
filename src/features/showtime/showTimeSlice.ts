import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';

export interface Show {
  time: string;
  hall: number;
}

interface Showtime {
  date: string;
  shows: Array<Show>;
}

interface State {
  showtimes: Array<Showtime>;
  dateChosen: string;
  hall?: number;
  disabled: boolean;
}

const initialState: State = {
  showtimes: [],
  dateChosen: new Date().toISOString(),
  disabled: false,
};

export const fetchShowtimes = createAsyncThunk('showtime/fetchShowtimes', async () => {
  const response = await axios.get('/showtimes');
  return response.data as Array<Showtime>;
});

const showtimeSlice = createSlice({
  name: 'showtime',
  initialState,
  reducers: {
    setDateChosen: (state, action: PayloadAction<string>) => {
      state.dateChosen = action.payload;
      state.hall = undefined;
    },
    setShowChosen: (state, action: PayloadAction<Show>) => {
      state.dateChosen = action.payload.time;
      state.hall = action.payload.hall;
    },
    toggleShowTime: (state) => {
      state.disabled = !state.disabled;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShowtimes.fulfilled, (state, action: PayloadAction<Array<Showtime>>) => {
      state.showtimes = action.payload;
    });
  },
});

export const { setDateChosen, setShowChosen, toggleShowTime } = showtimeSlice.actions;
export const getDisabled = (state: RootState): boolean => state.showtime.disabled;
export const getAvailableShowTimes = (state: RootState): Array<Showtime> => state.showtime.showtimes;
export const getDateChosen = (state: RootState): Date => new Date(state.showtime.dateChosen);
export const getAvailableTime = (state: RootState): Array<Show> => {
  const times = state.showtime.showtimes.find(
    (item) => dayjs(item.date).isSame(dayjs(state.showtime.dateChosen), 'day')
  )?.shows;

  return times || [];
};

export default showtimeSlice.reducer;
