import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Loading, LoadingInfo, Button } from './styled';
import { LoadingStatus } from '../types/types';

interface Props {
  status: LoadingStatus;
}

const getIcon = (status: LoadingStatus) => {
  switch (status) {
    case LoadingStatus.Pending:
      return <FontAwesomeIcon icon={faCog} spin />;
    case LoadingStatus.ConnectionError:
      return (
        <Button type="button" onClick={() => window.location.reload()} title="Refresh page">
          <FontAwesomeIcon icon={faRedo} />
        </Button>
      );
    case LoadingStatus.OtherError:
    default:
      return <FontAwesomeIcon icon={faTimes} />;
  }
};

const getLabel = (status: LoadingStatus) => {
  switch (status) {
    case LoadingStatus.Pending:
      return 'Loading data about the films and showtimes...';
    case LoadingStatus.ConnectionError:
      return 'Please check your internet connection or try again later.';
    case LoadingStatus.OtherError:
    default:
      return 'Ooops! Something went wrong. Please, try again later.';
  }
};

const LoadingLayout: FunctionComponent<Props> = ({ status }) => (
  <Loading disabled>
    {getIcon(status)}
    <LoadingInfo>
      {getLabel(status)}
    </LoadingInfo>
  </Loading>
);

export default LoadingLayout;
