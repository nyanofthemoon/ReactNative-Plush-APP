'use strict'

import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';

import Store from './configureStore'
import Home from './containers/Home'
import Video from './containers/Video'
import Profile from './containers/Profile'
import Friends from './containers/Friends'
import Error from './containers/Error'

const scenes = Actions.create(
  <Scene key='root' hideNavBar={true}>
    <Scene key='home' component={Home} type={ActionConst.REPLACE} initial='true' />
    <Scene key='friends' component={Friends} type={ActionConst.REPLACE}/>
    <Scene key='profile' component={Profile} type={ActionConst.REPLACE}/>
    <Scene key='video' component={Video} type={ActionConst.REPLACE}/>
    <Scene key='error' component={Error} type={ActionConst.REPLACE} />
  </Scene>
);

const RNBoilerplate = () => (
  <Provider store={Store}>
    <Router scenes={scenes}/>
  </Provider>
)

AppRegistry.registerComponent('RNBoilerplate', () => RNBoilerplate)