'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  facebookStatus: 'unauthenticated',
  socketStatus  : 'disconnected',
  socket        : null
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.FACEBOOK_LOGIN_REQUESTED:
      nextState = fromJS(state).set('facebookStatus', 'authenticating')
      break
    case types.FACEBOOK_LOGIN_SUCCEEDED:
      nextState = fromJS(state).set('facebookStatus', 'authenticated')
      break
    case types.FACEBOOK_LOGIN_FAILED:
      nextState = fromJS(state).merge({
        facebookStatus: 'unauthenticated',
        socketStatus  : 'disconnected'
      })
      break
    case types.SOCKET_CONNECTION_REQUESTED:
      nextState = fromJS(state).merge({
        socketStatus: 'connecting',
        socket      : null
      })
      break
    case types.SOCKET_CONNECTION_SUCCEEDED:
      nextState = fromJS(state).merge({
        socketStatus: 'connected',
        socket      : action.payload.socket
      })
      break
    case types.SOCKET_CONNECTION_FAILED:
      nextState = fromJS(state).merge({
        socketStatus: 'disconnected',
        socket      : null
      })
      break
    default:
      break
  }
  return nextState || state
}