import React, { FunctionComponent } from 'react';
import { Main, Info } from './styled';
import Film from '../features/film/Film';
import ShowTime from '../features/showtime/Showtime';
import SeatChoice from '../features/seatchoice/SeatChoice';

const Layout: FunctionComponent = () => (
  <Main>
    <Info>
      <Film />
      <ShowTime />
    </Info>
    <SeatChoice />
  </Main>
);

export default Layout;
