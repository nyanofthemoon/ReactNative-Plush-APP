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


      alert('SENT '+JSON.stringify(contactIdMMsg))

      if (!prevStateMMsg.messages[contactIdMMsg]) {
        prevStateMMsg.messages[contactIdMMsg] = []
      }
      action.payload.id   = null
      action.payload.text = action.payload.message
      action.payload.date = new Date().getTime()

      //alert('MERGED '+JSON.stringify(action.payload)



      delete(action.payload.message)
      prevStateMMsg.messages[contactIdMMsg].push(action.payload)


      nextState = fromJS(state).set('messages', prevStateMMsg.messages)



      break
    case types.SOCKET_MESSAGE_USER_RECEIVED:
      let prevStateMsg = fromJS(state).toJS()
      let contactIdMsg = action.payload.id
      if (action.payload.data) {
        if (!prevStateMsg.messages[contactIdMsg]) {
          prevStateMsg.messages[contactIdMsg] = []
        }
        prevStateMsg.messages[contactIdMsg].push(action.payload.data)
        nextState = fromJS(state).set('messages', prevStateMsg.messages)
      }
      break
    default:
      break
  }
  return nextState || state
}