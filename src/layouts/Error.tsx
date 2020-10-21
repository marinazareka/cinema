import React from 'react';
import { FilmContainer } from '../features/film/styled';
import { ShowTimeContainer } from '../features/showtime/styled';
import { Info, Main, SeatChoiceContainer } from './styled';
import PendingLayout from './Pending';

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
          <PendingLayout error />
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
