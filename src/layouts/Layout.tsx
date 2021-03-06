import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Main, Info } from './styled';
import Film from '../features/film/Film';
import Showtime from '../features/showtime/Showtime';
import { getFilmStatus } from '../features/film/filmSlice';
import { getShowsStatus } from '../features/showtime/showtimeSlice';
import { getSeatsStatus } from '../features/seatchoice/seatChoiceSlice';
import LoadingLayout from './Loading';
import SeatsLayout from './SeatsLayout';
import { ErrorBoundary } from './Error';
import { LoadingStatus, Status } from '../types/types';

const Layout: FunctionComponent = () => {
  const filmStatus = useSelector(getFilmStatus);
  const showsStatus = useSelector(getShowsStatus);
  const seatsStatus = useSelector(getSeatsStatus);
  const loading = filmStatus !== Status.Complete
    || showsStatus !== Status.Complete
    || seatsStatus !== Status.Complete;
  const error = filmStatus === Status.Failed
    || showsStatus === Status.Failed
    || seatsStatus === Status.Failed;

  return (
    <ErrorBoundary>
      <Main>
        {loading && <LoadingLayout status={error ? LoadingStatus.ConnectionError : LoadingStatus.Pending} />}
        <Info>
          <Film />
          <Showtime />
        </Info>
        <SeatsLayout />
      </Main>
    </ErrorBoundary>
  );
};

export default Layout;
