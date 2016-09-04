'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  profiles: {},
  messages: {}
  //
  // id: {
  //   last: date of last checked
  //   list: { date:, message: }
  //
  //
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.DB_LOAD_CONTACTS:
      nextState = fromJS(state).merge(action.payload.data)
      break
    case types.SOCKET_QUERY_CONTACT_RECEIVED:
      let prevState = fromJS(state).toJS()
      let contactId = action.payload.data.id
      prevState.profiles[contactId] = action.payload.data
      nextState = fromJS(state).set('profiles', prevState.profiles)
      break




    case types.SOCKET_MESSAGE_USER_REQUESTED:
      let prevStateMMsg = fromJS(state).toJS()
      let contactIdMMsg = action.payload.id
      if (!prevStateMMsg.messages[contactIdMMsg]) {
        prevStateMMsg.messages[contactIdMMsg] = []
      }
      prevStateMMsg.messages[contactIdMMsg].push({data: action.payload.message})
      nextState = fromJS(state).set('messages', prevStateMMsg.messages)

      alert("SENT"+JSON.stringify(prevStateMMsg.messages))

      break

    case types.SOCKET_MESSAGE_USER_RECEIVED:
      let prevStateMsg = fromJS(state).toJS()
      let contactIdMsg = action.payload.id
      if (!prevStateMsg.messages[contactIdMsg]) {
        prevStateMsg.messages[contactIdMsg] = []
      }
      prevStateMsg.messages[contactIdMsg].push({id: contactIdMsg, data: action.payload.message})
      nextState = fromJS(state).set('messages', prevStateMsg.messages)

      alert("GOT"+JSON.stringify(prevStateMsg.messages))

      break
    default:
      break
  }
  return nextState || state
}