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
  matchIsShy     : null,
  localStream    : null
})

export default (state = initialState, action) => {
  let nextState
  switch (action.type) {
    case types.FACEBOOK_LOGIN_REQUESTED:
      nextState = state.set('facebookStatus', 'authenticating')
      break
    case types.FACEBOOK_LOGIN_SUCCEEDED:
      nextState = state.set('facebookStatus', 'authenticated')
      break
    case types.FACEBOOK_LOGIN_FAILED:
      nextState = state.merge({
        facebookStatus: 'unauthenticated',
        socketStatus  : 'disconnected',
        apiStatus     : 'disconnected',
        socket        : null
      })
      break
    case types.SOCKET_CONNECTION_REQUESTED:
      nextState = state.merge({
        socketStatus: 'connecting',
        apiStatus   : 'disconnected'
      })
      break
    case types.SOCKET_CONNECTION_SUCCEEDED:
      nextState = state.merge({
        socketStatus: 'connected',
        apiStatus   : 'disconnected',
        socket      : action.payload.socket
      })
      break
    case types.SOCKET_CONNECTION_FAILED:
      nextState = state.merge({
        socketStatus: 'disconnected',
        apiStatus   : 'disconnected'
      })
      break
    case types.SOCKET_LOGIN_USER_REQUESTED:
      nextState = state.set('apiStatus', 'connecting')
      break
    case types.SOCKET_QUERY_USER_RECEIVED:
      nextState = state.set('apiStatus', 'connected')
      break
    case types.SCENE_NAVIGATION_CONTACTS:
      nextState = state.merge({
        previousScene: state.get('currentScene'),
        currentScene : 'contacts'
      })
      break
    case types.SCENE_NAVIGATION_CONTACT:
      nextState = state.merge({
        previousScene  : state.get('currentScene'),
        currentScene   : 'contact',
        currentSceneId : action.payload,
        currentSceneTab: 1
      })
      break
    case types.SOCKET_QUERY_ROOM_RECEIVED:
      if (action.payload.data.users) {
        Object.keys(action.payload.data.users).forEach(function(socketId) {
          if (('/#' + getSocketId()) != socketId) {
            nextState = state.set('currentSceneId', action.payload.data.users[socketId])
          }
        })
      }
      break
    case types.SCENE_NAVIGATION_TAB_CHANGE:
      nextState = state.set('currentSceneTab', action.payload)
      break
    case types.SCENE_NAVIGATION_PROFILE:
      nextState = state.merge({
        previousScene: state.get('currentScene'),
        currentScene : 'profile'
      })
      break
    case types.SCENE_NAVIGATION_HOME:
      nextState = state.merge({
        previousScene: state.get('currentScene'),
        currentScene : 'home'
      })
      break
    case types.SCENE_NAVIGATION_LOGOUT:
      nextState = state.merge({
        previousScene: state.get('currentScene'),
        currentScene : 'logout'
      })
      break
    case types.SCENE_NAVIGATION_MATCH:
      nextState = state.merge({
        previousScene : state.get('currentScene'),
        currentScene  : 'match',
        matchMode     : action.payload.type,
        matchIsStealth: action.payload.stealth || 'no'
      })
      break
    case types.SCENE_NAVIGATION_CALL:
      nextState = state.merge({
        previousScene : state.get('currentScene'),
        currentScene  : 'call'
      })
      break
    case types.SCENE_NAVIGATION_ERROR:
      nextState = state.merge({
        facebookStatus: 'unauthenticated',
        socketStatus  : 'disconnected',
        apiStatus     : 'disconnected',
        socket        : null,
        errorMessage  : action.payload,
        previousScene : state.get('currentScene'),
        currentScene  : 'error'
      })
      break

    case types.SOCKET_QUERY_CONTACT_RECEIVED:
      nextState = state.set('currentSceneId', action.payload.data.id)
      break

    case types.SOCKET_CONTACT_CALL_REQUESTED:
      nextState = state.set('currentSceneId', action.payload.id)
      break

    case types.SOCKET_MATCH_JOIN_REQUESTED:
      if (action.payload.stream) {
        nextState = state.set('localStream', action.payload.stream)
      }
      break

    case types.SOCKET_QUERY_CALL_REQUESTED:
      if (action.payload.data && action.payload.data.status === 'inactive') {
        nextState = state.set('localStream', null)
      } else if (action.payload.stream) {
        nextState = state.set('localStream', action.payload.stream)
      }
      break;

    case types.SOCKET_MATCH_LEAVE_REQUESTED:
    case types.SOCKET_CONTACT_CALL_HANGUP_REQUESTED:
      nextState = state.set('localStream', null)
      break

    default:
      break
  }
  return nextState || state
}