import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Pending, PendingInfo } from './styled';

interface Props {
  error: boolean;
}

const PendingLayout: FunctionComponent<Props> = ({ error }) => {
  return (
    <Pending disabled>
      <FontAwesomeIcon icon={error ? faTimes : faCog} spin={!error} />
      <PendingInfo>
        {error
          ? 'Sorry, there\'re problems with the connection. Do you want to try again?'
          : 'We are loading info about the films and showtimes...'}
      </PendingInfo>
    </Pending>
  );
};

export default PendingLayout;
