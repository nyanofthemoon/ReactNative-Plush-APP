'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  facebookStatus: 'unauthenticated',
  socketStatus  : 'disconnected',
  socket        : null,
  apiStatus     : 'disconnected'
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
        socketStatus  : 'disconnected',
        apiStatus     : 'disconnected',
        socket        : null
      })
      break
    case types.SOCKET_CONNECTION_REQUESTED:
      nextState = fromJS(state).merge({
        socketStatus: 'connecting',
        apiStatus   : 'disconnected',
        socket      : null
      })
      break
    case types.SOCKET_CONNECTION_SUCCEEDED:
      nextState = fromJS(state).merge({
        socketStatus: 'connected',
        apiStatus   : 'disconnected',
        socket      : action.payload.socket
      })
      break
    case types.SOCKET_CONNECTION_FAILED:
      nextState = fromJS(state).merge({
        socketStatus: 'disconnected',
        apiStatus   : 'disconnected',
        socket      : null
      })
      break
    case types.SOCKET_LOGIN_USER_REQUESTED:
      nextState = fromJS(state).set('apiStatus', 'connecting')
      break
    case types.SOCKET_QUERY_USER_RECEIVED:
      nextState = fromJS(state).set('apiStatus', 'connected')
      break
    default:
      break
  }
  return nextState || state
}