'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  name       : null,
  type       : null,
  status     : null,
  timer      : null,
  video      : null,
  stealth    : null,
  genderMatch: null,
  ageGroup   : null,
  scores     : {
    audio: 0,
    video: 0
  },
  results    : {
    audio: {},
    video: {}
  }
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.SCENE_NAVIGATION_MATCH:
      nextState = fromJS(initialState)
      break
    case types.SOCKET_QUERY_ROOM_REQUESTED:
      break
    case types.SOCKET_QUERY_ROOM_RECEIVED:
      nextState = fromJS(state).merge(action.payload.data)
      break
    default:
      break
  }
  return nextState || state
}