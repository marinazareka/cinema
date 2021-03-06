import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';
import http from '../../http';
import { Status } from '../../types/types';

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
  shows: Show[];
}

interface Response extends CinemaData {
  showtimes: Showtime[];
}

interface State extends Response {
  dateChosen: string;
  showId?: number;
  hall?: number;
  disabled: boolean;
  status: Status;
}

const initialState: State = {
  showtimes: [],
  dateChosen: new Date().toISOString(),
  disabled: false,
  cinema: '',
  address: '',
  status: Status.Idle,
};

export const fetchShowtimes = createAsyncThunk('showtime/fetchShowtimes', async () => {
  const response = await http.get('/shows');
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
      state.status = Status.Complete;
    });
    builder.addCase(fetchShowtimes.rejected, (state) => {
      state.status = Status.Failed;
    });
  },
});

export const { setDateChosen, setShowChosen, toggleShowTime } = showtimeSlice.actions;

export const getShowsStatus = (state: RootState): Status => state.showtime.status;
export const getDisabled = (state: RootState): boolean => state.showtime.disabled;
export const getAvailableShowTimes = (state: RootState): Showtime[] => state.showtime.showtimes;
export const getDateChosen = createSelector<RootState, string, Date>(
  (state) => state.showtime.dateChosen,
  (dateChosen) => new Date(dateChosen)
);
export const getShowChosen = (state: RootState): ShowData => ({
  id: state.showtime.showId as number,
  time: state.showtime.dateChosen,
  hall: state.showtime.hall as number,
  cinema: state.showtime.cinema,
  address: state.showtime.address,
});
export const getShowIdChosen = (state: RootState): number => state.showtime.showId as number;
export const getAvailableTime = createSelector<RootState, Showtime[], string, Show[]>(
  (state) => state.showtime.showtimes,
  (state) => state.showtime.dateChosen,
  (showtimes, dateChosen) => showtimes.find((item) => dayjs(item.date).isSame(dayjs(dateChosen), 'day'))?.shows || []
);

export default showtimeSlice.reducer;
