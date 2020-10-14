import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filmReducer from '../features/film/filmSlice';
import showtimeReducer from '../features/showtime/showtimeSlice';
import seatchoiceReducer from '../features/seatchoice/seatChoiceSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    film: filmReducer,
    showtime: showtimeReducer,
    seatchoice: seatchoiceReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
