import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filmReducer from '../features/film/filmSlice';
import showtimeReducer from '../features/showtime/showtimeSlice';

export const store = configureStore({
  reducer: {
    film: filmReducer,
    showtime: showtimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
