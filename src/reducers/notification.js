'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  room: null,
  data: {
    leftEmoticon : null,
    leftGender   : null,
    rightEmoticon: null,
    rightGender  : null
  }
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.SOCKET_NOTIFICATION_ROOM_RECEIVED:
      nextState = fromJS(state).merge(action.payload)
      break
    case types.SOCKET_NOTIFICATION_UNKNOWN_RECEIVED:
    default:
      break
  }
  return nextState || state
}