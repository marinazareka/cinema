import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from './reset-styles';

const Reset = createGlobalStyle`${reset}`;

export default () => (
  <Reset />
);
