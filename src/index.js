import React           from 'react';
import { AppRegistry } from 'react-native';
import { Provider }    from 'react-redux';
import Router          from './containers/Router';
import Store           from './configureStore';

const RNBoilerplate = () => (
  <Provider store={Store}>
    <Router />
  </Provider>
);

AppRegistry.registerComponent('RNBoilerplate', () => RNBoilerplate);