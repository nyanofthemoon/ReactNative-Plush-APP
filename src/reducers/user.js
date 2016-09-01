'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  id       : null,
  profile  : {
    nickname   : null,
    gender     : null,
    birthday   : null,
    orientation: null,
    friendship : null,
    headline   : null,
    bio        : null,
    career     : null,
    diet       : null, // unhealthy, healthy, vegetarian, vegan, intolerant, other
    picture    : null,
    astrological: {
      chinese   : null,
      zodiac    : null,
      birthstone: null,
      planet    : null,
      element   : null
    }
  },
  personality: {
  },
  location: {
    city     : null,
    country  : null,
    latitude : null,
    longitude: null,
    locale   : null,
    timezone : null
  },
  providers  : {
    facebook: {
      url    : null,
      picture: null
    }
  },
  contacts: {
    friendship  : {},
    relationship: {},
    blocked     : {}
  },
  reports: {
    reported  : 0,
    reportedby: 0
  },
  friendshipData  : {},
  relationshipData: {}
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.FACEBOOK_GRAPH_DATA_REQUESTED:
    case types.SOCKET_QUERY_USER_REQUESTED:
    case types.SOCKET_QUERY_CONTACT_REQUESTED:
    case types.SOCKET_LOGIN_USER_REQUESTED:
    case types.FACEBOOK_GRAPH_DATA_SUCCEEDED:
    case types.FACEBOOK_GRAPH_DATA_FAILED:
      break
    case types.SOCKET_QUERY_USER_RECEIVED:
    case types.DB_LOAD_USER:
      nextState = fromJS(state).merge(action.payload.data)
      break
    case types.SOCKET_QUERY_CONTACT_RECEIVED:
      let prevState = fromJS(state).toJS()
      let contactId = action.payload.data.id
      if (prevState.contacts.friendship[contactId]) {
        prevState.friendshipData[contactId] = action.payload.data
        nextState = fromJS(state).set('friendshipData', prevState.friendshipData)
      }
      if (prevState.contacts.relationship[contactId]) {
        prevState.relationshipData[contactId] = action.payload.data
        nextState = fromJS(state).set('relationshipData', prevState.relationshipData)
      }
      break
    default:
      break
  }
  return nextState || state
}