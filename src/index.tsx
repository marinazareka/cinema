import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { fetchFilm } from './features/film/filmSlice';
import { fetchDates } from './features/showtime/showTimeSlice';

store.dispatch(fetchFilm());
store.dispatch(fetchDates());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
