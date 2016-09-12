'use strict'

import {fromJS} from 'immutable'

import * as types from './../constants'
import { getSocketId } from './../helpers/socket'

const initialState = fromJS({
  facebookStatus : 'unauthenticated',
  socketStatus   : 'disconnected',
  socket         : null,
  apiStatus      : 'disconnected',
  errorMessage   : null,
  previousScene  : null,
  currentScene   : null,
  currentSceneTab: null,
  currentSceneId : null,
  matchMode      : null,
  matchIsShy     : null
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.FACEBOOK_LOGIN_REQUESTED:
      nextState = fromJS(state).set('facebookStatus', 'authenticating')
      break
    case types.FACEBOOK_LOGIN_SUCCEEDED:
      nextState = fromJS(state).set('facebookStatus', 'authenticated')
      break
    case types.FACEBOOK_LOGIN_FAILED:
      nextState = fromJS(state).merge({
        facebookStatus: 'unauthenticated',
        socketStatus  : 'disconnected',
        apiStatus     : 'disconnected',
        socket        : null
      })
      break
    case types.SOCKET_CONNECTION_REQUESTED:
      nextState = fromJS(state).merge({
        socketStatus: 'connecting',
        apiStatus   : 'disconnected'
      })
      break
    case types.SOCKET_CONNECTION_SUCCEEDED:
      nextState = fromJS(state).merge({
        socketStatus: 'connected',
        apiStatus   : 'disconnected',
        socket      : action.payload.socket
      })
      break
    case types.SOCKET_CONNECTION_FAILED:
      nextState = fromJS(state).merge({
        socketStatus: 'disconnected',
        apiStatus   : 'disconnected'
      })
      break
    case types.SOCKET_LOGIN_USER_REQUESTED:
      nextState = fromJS(state).set('apiStatus', 'connecting')
      break
    case types.SOCKET_QUERY_USER_RECEIVED:
      nextState = fromJS(state).set('apiStatus', 'connected')
      break
    case types.SCENE_NAVIGATION_CONTACTS:
      nextState = fromJS(state).merge({
        previousScene: state.get('currentScene'),
        currentScene : 'contacts'
      })
      break
    case types.SCENE_NAVIGATION_CONTACT:
      nextState = fromJS(state).merge({
        previousScene : state.get('currentScene'),
        currentScene  : 'contact',
        currentSceneId: action.payload
      })
      break
    case types.SOCKET_QUERY_ROOM_RECEIVED:
      if (action.payload.data.users) {
        Object.keys(action.payload.data.users).forEach(function(socketId) {
          if (('/#' + getSocketId()) != socketId) {
            nextState = fromJS(state).set('currentSceneId', action.payload.data.users[socketId])
          }
        })
      }
      break
    case types.SCENE_NAVIGATION_TAB_CHANGE:
      nextState = fromJS(state).set('currentSceneTab', action.payload)
      break
    case types.SCENE_NAVIGATION_PROFILE:
      nextState = fromJS(state).merge({
        previousScene: state.get('currentScene'),
        currentScene : 'profile'
      })
      break
    case types.SCENE_NAVIGATION_HOME:
      nextState = fromJS(state).merge({
        previousScene: state.get('currentScene'),
        currentScene : 'home'
      })
      break
    case types.SCENE_NAVIGATION_LOGOUT:
      nextState = fromJS(state).merge({
        previousScene: state.get('currentScene'),
        currentScene : 'logout'
      })
      break
    case types.SCENE_NAVIGATION_MATCH:
      nextState = fromJS(state).merge({
        previousScene : state.get('currentScene'),
        currentScene  : 'match',
        matchMode     : action.payload.type,
        matchIsStealth: action.payload.stealth || 'no'
      })
      break
    case types.SCENE_NAVIGATION_ERROR:
      nextState = fromJS(state).merge({
        facebookStatus: 'unauthenticated',
        socketStatus  : 'disconnected',
        apiStatus     : 'disconnected',
        socket        : null,
        errorMessage  : action.payload,
        previousScene : state.get('currentScene'),
        currentScene  : 'error'
      })
    case types.SOCKET_QUERY_CONTACT_RECEIVED:
      if ('match' === state.get('currentScene')) {
        nextState = fromJS(state).merge({
          currentSceneId : action.payload.data.id,
          currentSceneTab: 0
        })
      }
      break
    default:
      break
  }
  return nextState || state
}