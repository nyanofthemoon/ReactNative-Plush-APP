'use strict'

import React from 'react'
import { AppRegistry } from 'react-native'
import './compat'
import { Provider } from 'react-redux'
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux'

import Store from './configureStore'
import Home from './containers/Home'
import Match from './containers/Match'
import Profile from './containers/Profile'
import Contacts from './containers/Contacts'
import Contact from './containers/Contact'
import Logout from './containers/Logout'
import Error from './containers/Error'

const scenes = Actions.create(
  <Scene key='root' hideNavBar={true}>
    <Scene key='home' component={Home} type={ActionConst.RESET} />
    <Scene key='contacts' component={Contacts} type={ActionConst.REPLACE}/>
    <Scene key='contact' component={Contact} type={ActionConst.REPLACE}/>
    <Scene key='profile' component={Profile} type={ActionConst.REPLACE}/>
    <Scene key='matchs' component={Match} type={ActionConst.REPLACE}/>
    <Scene key='logout' component={Logout} type={ActionConst.PUSH_OR_POP}/>
    <Scene key='error' component={Error} type={ActionConst.PUSH_OR_POP} />
  </Scene>
)

const RNBoilerplate = () => (
  <Provider store={Store}>
    <Router scenes={scenes}/>
  </Provider>
)

AppRegistry.registerComponent('RNBoilerplate', () => RNBoilerplate)