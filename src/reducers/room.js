'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  name       : null,
  type       : null,
  status     : null,
  video      : null,
  genderMatch: null,
  timer      : null,
  ageGroup   : null,
  results    : {
    audio: {},
    video: {}
  }
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.SCENE_NAVIGATION_VIDEO:
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