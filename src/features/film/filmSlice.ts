import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RootState } from '../../app/store';
import { Status } from '../../types/types';

interface Film {
  title: string;
  annotation: string;
  posterUrl: string;
  country: Array<string>;
  certificate: string;
  imdbRating: number;
  runtime: string;
  genre: Array<string>;
}

interface State {
  status: Status;
  data: Film;
}

const initialState: State = {
  status: Status.Idle,
  data: {
    title: '',
    annotation: '',
    posterUrl: '',
    country: [],
    certificate: '',
    imdbRating: 0,
    runtime: '',
    genre: [],
  },
};

export const fetchFilm = createAsyncThunk('film/fetchFilm', async () => {
  const response = await axios.get('/film');
  return response.data as Film;
});

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilm.fulfilled, (state, action: PayloadAction<Film>) => {
      state.data = action.payload;
      state.status = Status.Complete;
    });
  },
});

export const getFilmInfo = (state: RootState): Film => {
  dayjs.extend(duration);
  const dur = dayjs.duration(state.film.data.runtime);
  return {
    ...state.film.data,
    runtime: `${dur.hours()}h${dur.minutes() && `${dur.minutes()}min`}`,
  };
};
export const getStatus = (state: RootState): Status => state.film.status;
export const isFilmNotReady = (state: RootState): boolean => state.film.status !== Status.Complete;

export default filmSlice.reducer;
