'use strict'

import { combineReducers } from 'redux'

import app          from './app'
import room         from './room'
import user         from './user'
import notification from './notification'

export default combineReducers({
  app,
  room,
  user,
  notification
})