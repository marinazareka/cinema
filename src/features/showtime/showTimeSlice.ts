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
  dateChoosen: string;
  hall?: number;
}

const initialState: State = {
  showtimes: [],
  dateChoosen: new Date().toISOString(),
};

export const fetchShowtimes = createAsyncThunk('showtime/fetchShowtimes', async () => {
  const response = await axios.get('/showtimes');
  return response.data as Array<Showtime>;
});

const showtimeSlice = createSlice({
  name: 'showtime',
  initialState,
  reducers: {
    setDateChoosen: (state, action: PayloadAction<string>) => {
      state.dateChoosen = action.payload;
      state.hall = undefined;
    },
    setShowChoosen: (state, action: PayloadAction<Show>) => {
      state.dateChoosen = action.payload.time;
      state.hall = action.payload.hall;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShowtimes.fulfilled, (state, action: PayloadAction<Array<Showtime>>) => {
      state.showtimes = action.payload;
    });
  },
});

export const { setDateChoosen, setShowChoosen } = showtimeSlice.actions;
export const getAvailableShowTimes = (state: RootState): Array<Showtime> => state.showtime.showtimes;
export const getDateChoosen = (state: RootState): Date => new Date(state.showtime.dateChoosen);
export const getAvailableTime = (state: RootState): Array<Show> => {
  const times = state.showtime.showtimes.find(
    (item) => dayjs(item.date).isSame(dayjs(state.showtime.dateChoosen), 'day')
  )?.shows;

  return times || [];
};

export default showtimeSlice.reducer;
