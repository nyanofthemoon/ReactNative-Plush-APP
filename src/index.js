import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import Router from './containers/Router';
import Store from './configureStore';

const RNBoilerplate = () => (
  <Provider store={Store}>
    <Router />
  </Provider>
);

AppRegistry.registerComponent('RNBoilerplate', () => RNBoilerplate);