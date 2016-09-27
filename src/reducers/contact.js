'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'

const initialState = fromJS({
  profiles: {},
  messages: {},
  count   : {}
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {

    case types.ERASE_ALL_DATA:
      nextState = initialState
      break

    case types.DB_LOAD_CONTACTS:
      nextState = fromJS(action.payload.data)
      break

    case types.SOCKET_QUERY_CONTACT_RECEIVED:
      var tempState = state.toJS()
      tempState.profiles[action.payload.data.id] = action.payload.data
      nextState = state.set('profiles', fromJS(tempState.profiles))
      break

    case types.SOCKET_MESSAGE_USER_REQUESTED:
      var tempState = state.toJS();
      var senderId  = action.payload.id
      tempState.messages[senderId] = tempState.messages[senderId] || []
      action.payload.id   = null
      action.payload.text = action.payload.message
      action.payload.date = new Date().getTime()
      delete(action.payload.message)
      tempState.messages[senderId].unshift(action.payload)
      if (tempState.messages[senderId].length > 200) {
        tempState.messages[senderId] = tempState.messages[senderId].slice(0, 200)
      }
      tempState.count[senderId] = 0
      nextState = state.merge({
        messages: fromJS(tempState.messages),
        count   : fromJS(tempState.count)
      })
      break

    case types.SOCKET_MESSAGE_USER_RECEIVED:
      var tempState = state.toJS()
      var scene    = action.payload.scene
      var sceneId  = action.payload.sceneId
      var sceneTab = action.payload.sceneTab
      delete(action.payload.scene)
      delete(action.payload.sceneTab)
      delete(action.payload.sceneId)
      tempState.messages[action.payload.id] = tempState.messages[action.payload.id] || []
      tempState.messages[action.payload.id].unshift(action.payload)
      if (tempState.messages[action.payload.id].length > 200) {
        tempState.messages[action.payload.id] = tempState.messages[action.payload.id].slice(0, 200)
      }
      if ('contact' !== scene || action.payload.id != sceneId || sceneTab != 1) {
        tempState.count[action.payload.id] = tempState.count[action.payload.id] + 1 || 1
      }
      nextState = state.merge({
        messages: fromJS(tempState.messages),
        count   : fromJS(tempState.count)
      })
      break

    case types.SCENE_NAVIGATION_CONTACT:
      var tempState = state.toJS()
      tempState.count[action.payload] = 0
      nextState = state.set('count', fromJS(tempState.count))
      break

    default:
      break
  }
  return nextState || state
}