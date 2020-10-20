import React, { FunctionComponent, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Main, Info, Pending, PendingInfo } from './styled';

const Layout: FunctionComponent = () => {
  const Film = React.lazy(() => import('../features/film/Film'));
  const Showtime = React.lazy(() => import('../features/showtime/Showtime'));
  const SeatsLayout = React.lazy(() => import('./SeatsLayout'));

  return (
    <Main>
      <Suspense fallback={(
        <Pending disabled>
          <FontAwesomeIcon icon={faCog} spin />
          <PendingInfo>
            We are loading info about
            the film and showtimes...
          </PendingInfo>
        </Pending>
      )}
      >
        <Info>
          <Film />
          <Showtime />
        </Info>
        <SeatsLayout />
      </Suspense>
    </Main>
  );
};

export default Layout;
