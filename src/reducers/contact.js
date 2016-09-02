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
    default:
      break
  }
  return nextState || state
}