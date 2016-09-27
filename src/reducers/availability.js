'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  call  : null,
  online: {}
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {

    case types.ERASE_ALL_DATA:
      nextState = initialState
      break

    case types.SOCKET_CONTACT_AVAILABILITY_RECEIVED:
      if (action.payload) {
        let prevState = state.toJSON()
        Object.keys(action.payload).forEach(function(id) {
          prevState.online[id] = action.payload[id]
        })
        nextState = state.set('online', fromJS(prevState.online))
      }
      break

    default:
      break
  }
  return nextState || state
}