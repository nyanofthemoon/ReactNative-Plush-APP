'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  start: null,
  end  : null
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.ERASE_ALL_DATA:
      nextState = initialState
      break
    case types.SOCKET_QUERY_EVENT_REQUESTED:
      break
    case types.SOCKET_QUERY_EVENT_RECEIVED:
      nextState = fromJS(state).merge(action.payload.data)
      break
    default:
      break
  }
  return nextState || state
}