import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { fetchFilm } from './features/film/filmSlice';
import { fetchShowtimes } from './features/showtime/showtimeSlice';
import { fetchSeats } from './features/seatchoice/seatChoiceSlice';

store.dispatch(fetchFilm()).catch((e) => { console.error('Fail to fetch film data ', e); });
store.dispatch(fetchShowtimes()).catch((e) => { console.error('Fail to fetch showtimes ', e); });
store.dispatch(fetchSeats()).catch((e) => { console.error('Fail to fetch seats ', e); });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export type AppDispatch = typeof store.dispatch;
