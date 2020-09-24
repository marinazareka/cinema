import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

interface FilmState {
  title: string;
  annotation: string;
  posterUrl: string;
  country: Array<string>;
  certificate: string;
  imdbRating: number;
  runtime: number;
  genre: Array<string>;
}

const initialState: FilmState = {
  title: '',
  annotation: '',
  posterUrl: 'string',
  country: [],
  certificate: '',
  imdbRating: 0,
  runtime: 0,
  genre: [],
};

export const fetchFilm = createAsyncThunk('film/fetchFilm', async () => {
  const response = await axios.get('/film');
  return response.data;
});

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [fetchFilm.fulfilled]: (state, action) => action.payload,
  },
});

export const getFilmInfo = (state: RootState) => state.film;

export default filmSlice.reducer;
