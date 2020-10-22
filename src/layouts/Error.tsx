import React from 'react';
import { FilmContainer } from '../features/film/styled';
import { ShowTimeContainer } from '../features/showtime/styled';
import { Info, Main, SeatChoiceContainer } from './styled';
import LoadingLayout from './Loading';
import { LoadingStatus } from '../types/types';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Record<string, unknown>, State> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Main>
          <LoadingLayout status={LoadingStatus.OtherError} />
          <Info>
            <FilmContainer />
            <ShowTimeContainer disabled />
          </Info>
          <SeatChoiceContainer disabled />
        </Main>
      );
    }

    return children;
  }
}
