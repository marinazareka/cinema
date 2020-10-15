import React, { FunctionComponent } from 'react';
import Layout from './layouts/Layout';
import GlobalStyles from './ui/GlobalStyles';

const App: FunctionComponent = () => (
  <>
    <GlobalStyles />
    <Layout />
  </>
);

export default App;
