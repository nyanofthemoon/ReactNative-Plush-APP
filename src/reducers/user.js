'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  email:           null,
  gender:          null,
  firstName:       null,
  lastName:        null,
  facebookProfile: null,
  facebookPicture: null,
  locale:          null,
  timezone:        null,
  contacts:        []
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.FACEBOOK_GRAPH_DATA_REQUESTED:
    case types.SOCKET_QUERY_USER_REQUESTED:
    case types.SOCKET_LOGIN_USER_REQUESTED:
      break
    case types.SOCKET_QUERY_USER_RECEIVED:
      break
    case types.FACEBOOK_GRAPH_DATA_SUCCEEDED:
    case types.FACEBOOK_GRAPH_DATA_FAILED:
      break;
    default:
      break
  }
  return nextState || state
}