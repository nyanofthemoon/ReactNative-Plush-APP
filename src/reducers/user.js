'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  id         : null,
  profile  : {
    nickname   : null,
    gender     : null,
    birthday   : null,
    orientation: null,
    agegroup   : null,
    friendship : null,
    headline   : null,
    bio        : null,
    education  : null,
    employment : null,
    diet       : null,
    picture    : null,
    astrological: {
      chinese   : null,
      zodiac    : null,
      birthstone: null,
      planet    : null,
      element   : null
    }
  },
  match: {
    audio: {
      success: 0,
      fail   : 0
    },
    video: {
      success: 0,
      fail   : 0
    }
  },
  personality: {
    internal: {
      bored      : 0,
      offended   : 0,
      angry      : 0,
      undecided  : 0,
      charmed    : 0,
      inspired   : 0,
      entertained: 0,
      excited    : 0
    },
    external: {
      bored      : 0,
      offended   : 0,
      angry      : 0,
      undecided  : 0,
      charmed    : 0,
      inspired   : 0,
      entertained: 0,
      excited    : 0
    }
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
  offlineMessages: []
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
    case types.SOCKET_UPDATE_PROFILE_REQUESTED:
      break
    case types.SOCKET_QUERY_USER_RECEIVED:
    case types.DB_LOAD_USER:
      nextState = fromJS(action.payload.data)
      break
    default:
      break
  }
  return nextState || state
}