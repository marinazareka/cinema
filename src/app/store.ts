import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import filmReducer from '../features/film/filmSlice';
import showTimeSlice from '../features/showtime/showTimeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    film: filmReducer,
    showtime: showTimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
