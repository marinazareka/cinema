import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

interface Show {
  time: string;
  hall: number;
}

interface ShowTime {
  date: string;
  shows: Array<Show>;
}

interface State {
  showtimes: Array<ShowTime>;
  dateChoosen: string;
}

const initialState: State = {
  showtimes: [],
  dateChoosen: new Date().toISOString(),
};

export const fetchDates = createAsyncThunk('showTime/fetchDates', async () => {
  const response = await axios.get('/showtimes');
  return response.data;
});

const showTimeSlice = createSlice({
  name: 'showTime',
  initialState,
  reducers: {
    setDateChoosen: (state, action) => {
      state.dateChoosen = action.payload;
    },
  },
  extraReducers: {
    // @ts-ignore
    [fetchDates.fulfilled]: (state, action) => {
      state.showtimes = action.payload;
    },
  },
});

export const { setDateChoosen } = showTimeSlice.actions;
export const getAvailableShowTimes = (state: RootState) => state.showtime.showtimes;
export const getDateChoosen = (state: RootState) => new Date(state.showtime.dateChoosen);

export default showTimeSlice.reducer;
