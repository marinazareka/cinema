import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';

export interface Show {
  id: number;
  time: string;
  hall: number;
}

interface CinemaData {
  cinema: '',
  address: '',
}

interface ShowData extends Show, CinemaData {}

interface Showtime {
  date: string;
  shows: Array<Show>;
}

interface Response extends CinemaData {
  showtimes: Array<Showtime>;
}

interface State extends Response {
  dateChosen: string;
  showId?: number;
  hall?: number;
  disabled: boolean;
}

const initialState: State = {
  showtimes: [],
  dateChosen: new Date().toISOString(),
  disabled: false,
  cinema: '',
  address: '',
};

export const fetchShowtimes = createAsyncThunk('showtime/fetchShowtimes', async () => {
  const response = await axios.get('/shows');
  return response.data as Response;
});

const showtimeSlice = createSlice({
  name: 'showtime',
  initialState,
  reducers: {
    setDateChosen: (state, action: PayloadAction<string>) => {
      state.dateChosen = action.payload;
      state.showId = undefined;
      state.hall = undefined;
    },
    setShowChosen: (state, action: PayloadAction<Show>) => {
      state.dateChosen = action.payload.time;
      state.hall = action.payload.hall;
      state.showId = action.payload.id;
    },
    toggleShowTime: (state) => {
      state.disabled = !state.disabled;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShowtimes.fulfilled, (state, action: PayloadAction<Response>) => {
      state.showtimes = action.payload.showtimes;
      state.cinema = action.payload.cinema;
      state.address = action.payload.address;
    });
  },
});

export const { setDateChosen, setShowChosen, toggleShowTime } = showtimeSlice.actions;
export const getDisabled = (state: RootState): boolean => state.showtime.disabled;
export const getAvailableShowTimes = (state: RootState): Array<Showtime> => state.showtime.showtimes;
export const getDateChosen = (state: RootState): Date => new Date(state.showtime.dateChosen);
export const getShowChosen = (state: RootState): ShowData => ({
  id: state.showtime.showId as number,
  time: state.showtime.dateChosen,
  hall: state.showtime.hall as number,
  cinema: state.showtime.cinema,
  address: state.showtime.address,
});
export const getShowIdChosen = (state: RootState): number => state.showtime.showId as number;
export const getAvailableTime = (state: RootState): Array<Show> => {
  const times = state.showtime.showtimes.find(
    (item) => dayjs(item.date).isSame(dayjs(state.showtime.dateChosen), 'day')
  )?.shows;

  return times || [];
};

export default showtimeSlice.reducer;
