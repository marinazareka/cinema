import React, { FunctionComponent } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from './reset-styles';

const Reset = createGlobalStyle`${reset}`;

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
      url('OpenSans-Regular.ttf') format('truetype');
  }

  * {
    font-family: 'Open Sans';
  }

`;

const GlobalStyles: FunctionComponent = () => (
  <>
    <Reset />
    <Fonts />
  </>
);

export default GlobalStyles;
