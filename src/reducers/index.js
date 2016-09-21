'use strict'

import { combineReducers } from 'redux'

import app          from './app'
import room         from './room'
import user         from './user'
import contact      from './contact'
import notification from './notification'
import availability from './availability'
import ring         from './ring'

export default combineReducers({
  app,
  room,
  user,
  contact,
  notification,
  availability,
  ring
})