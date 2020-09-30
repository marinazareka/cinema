import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RootState } from '../../app/store';

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

const initialState: Film = {
  title: '',
  annotation: '',
  posterUrl: '',
  country: [],
  certificate: '',
  imdbRating: 0,
  runtime: '',
  genre: [],
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
    builder.addCase(fetchFilm.fulfilled, (state, action: PayloadAction<Film>) => action.payload);
  },
});

export const getFilmInfo = (state: RootState): Film => {
  dayjs.extend(duration);
  const dur = dayjs.duration(state.film.runtime);
  return {
    ...state.film,
    runtime: `${dur.hours()}h${dur.minutes() && `${dur.minutes()}min`}`,
  };
};

export default filmSlice.reducer;
