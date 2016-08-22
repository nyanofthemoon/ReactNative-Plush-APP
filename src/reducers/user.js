'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  email          : null,
  gender         : null,
  firstName      : null,
  lastName       : null,
  facebookProfile: null,
  facebookPicture: null,
  locale         : null,
  timezone       : null,
  orientation    : null,
  friendship     : null,
  latitude       : null,
  longitude      : null,
  contacts       : {
    friendship  : {},
    relationship: {}
  }
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.FACEBOOK_GRAPH_DATA_REQUESTED:
    case types.SOCKET_QUERY_USER_REQUESTED:
    case types.SOCKET_LOGIN_USER_REQUESTED:
    case types.FACEBOOK_GRAPH_DATA_SUCCEEDED:
    case types.FACEBOOK_GRAPH_DATA_FAILED:
      break
    case types.SOCKET_QUERY_USER_RECEIVED:
      nextState = fromJS(state).merge(action.payload.data)
      break

    case types.GEOLOCATION_QUERY_RECEIVED:
      //alert(JSON.stringify(action.payload))
      //nextState = fromJS(state).merge({
      //
      //})
      break

    default:
      break
  }
  return nextState || state
}