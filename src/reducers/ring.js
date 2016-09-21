'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  name     : null,
  initiator: null,
  status   : null,
  users    : {}
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.SCENE_NAVIGATION_HOME:
    case types.SCENE_NAVIGATION_CONTACTS:
    case types.SOCKET_CONTACT_CALL_REQUESTED:
      nextState = initialState
      break
    case types.SOCKET_CONTACT_CALL_HANGUP_REQUESTED:
      nextState = state.set('status', 'inactive')
      break
    case types.SOCKET_QUERY_CALL_RECEIVED:
      nextState = fromJS(state).merge(action.payload.data)
      break
    default:
      break
  }
  return nextState || state
}