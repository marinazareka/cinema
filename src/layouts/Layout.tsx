import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Main, Info, SeatChoiceContainer, Pending, PendingInfo } from './styled';
import Film from '../features/film/Film';
import ShowTime from '../features/showtime/Showtime';
import SeatChoice from '../features/seatchoice/SeatChoice';
import Checkout from '../features/checkout/Checkout';
import { isFilmNotReady } from '../features/film/filmSlice';
import { isShowsNotReady } from '../features/showtime/showtimeSlice';
import { isSeatsChoiceDisabled, isSeatsNotReady } from '../features/seatchoice/seatChoiceSlice';

const Layout: FunctionComponent = () => {
  const filmNotReady = useSelector(isFilmNotReady);
  const showsNotReady = useSelector(isShowsNotReady);
  const seatsNotReady = useSelector(isSeatsNotReady);
  const loading = filmNotReady || showsNotReady || seatsNotReady;
  const seatsDisabled = useSelector(isSeatsChoiceDisabled);

  return (
    <Main>
      {loading && (
        <Pending disabled>
          <FontAwesomeIcon icon={faCog} spin />
          <PendingInfo>
            We are loading info about
            the film and showtimes...
          </PendingInfo>
        </Pending>
      )}
      <Info>
        <Film />
        <ShowTime />
      </Info>
      <SeatChoiceContainer disabled={seatsDisabled}>
        <SeatChoice />
        <Checkout />
      </SeatChoiceContainer>
    </Main>
  );
};

export default Layout;
