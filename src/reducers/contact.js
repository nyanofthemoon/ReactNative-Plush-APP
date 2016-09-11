'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  profiles: {},
  messages: {}
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.DB_LOAD_CONTACTS:
      nextState = fromJS(action.payload.data)
      break

    case types.SOCKET_QUERY_CONTACT_RECEIVED:
      var tempState = state.toJS()
      tempState.profiles[action.payload.data.id] = action.payload.data
      nextState = fromJS(tempState).set('profiles', fromJS(tempState.profiles))
      break

    case types.SOCKET_MESSAGE_USER_REQUESTED:
      var tempState = state.toJS();
      var senderId  = action.payload.id
      tempState.messages[senderId] = tempState.messages[senderId] || [];
      action.payload.id   = null
      action.payload.text = action.payload.message
      action.payload.date = new Date().getTime()
      delete(action.payload.message)
      tempState.messages[senderId].unshift(action.payload);
      nextState = fromJS(tempState).set('messages', fromJS(tempState.messages))
      break

    case types.SOCKET_MESSAGE_USER_RECEIVED:
      var tempState = state.toJS();
      tempState.messages[action.payload.id] = tempState.messages[action.payload.id] || [];
      tempState.messages[action.payload.id].unshift(action.payload);
      nextState = fromJS(tempState).set('messages', fromJS(tempState.messages))
      break

    default:
      break
  }
  return nextState || state
}