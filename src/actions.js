'use strict'

import {Actions} from 'react-native-router-flux'
const FBSDK = require('react-native-fbsdk')
const { AccessToken, GraphRequest, GraphRequestManager } = FBSDK

import * as types from './constants'
import Store      from './configureStore'

import {createSocketConnection, destroySocketConnection, isSocketConnected, emitSocketUserLoginEvent, emitSocketUserQueryEvent} from './helpers/socket'

let dispatch = Store.dispatch

function _getState() {
  return Store.getState();
}

export function facebookConnectionSuccess() {
  let apiConnectionStatus = _getState().app.get('apiStatus')
  if ('connected' != apiConnectionStatus) {
    dispatch({type: types.FACEBOOK_LOGIN_SUCCEEDED})
    socketConnectionRequest()
  }
}

export function facebookConnectionFailure() {
  dispatch({type: types.FACEBOOK_LOGIN_FAILED})
  destroySocketConnection();
  Actions.login()
}

function socketConnectionRequest() {
  dispatch({type: types.SOCKET_CONNECTION_REQUESTED})
  let socket = createSocketConnection()
  socket.on('error', function(error) {
    dispatch({type: types.SOCKET_CONNECTION_FAILED})
    Actions.login()
  })
  socket.on('connect', function() {
    dispatch({type: types.SOCKET_CONNECTION_SUCCEEDED, payload: { socket: socket }})
    socket.on('query', function(data) {
      switch(data.type) {
        case 'user': return queryUserReception(data)
        default    : return queryUnknownReception(data)
      }
    })
    socket.on('disconnect', function() {
      dispatch({type: types.SOCKET_CONNECTION_FAILED})
      Actions.login()
    })
    dispatch({type: types.FACEBOOK_GRAPH_DATA_REQUESTED})
    facebookGraphGetProfile()
  })

}

export function facebookGraphGetProfile() {
  AccessToken.getCurrentAccessToken().then(function(data) {
    new GraphRequestManager().addRequest(new GraphRequest(
      '/me?fields=email,gender,birthday,first_name,last_name,link,picture,locale,timezone',
      null,
      function(error, result) {
        if (error) {
          dispatch({type: types.FACEBOOK_GRAPH_DATA_FAILED})
        } else {
          dispatch({type: types.FACEBOOK_GRAPH_DATA_SUCCEEDED, payload: result})
          loginUser(result)
        }
      }
    )).start()
  })
}

function loginUser(data) {
  emitSocketUserLoginEvent(data)
  return { type: types.SOCKET_LOGIN_USER_REQUESTED, payload: data }
}

export function queryUser() {
  emitSocketUserQueryEvent()
  return { type: types.SOCKET_QUERY_USER_REQUESTED, payload: {} }
}

function queryUserReception(data) {
  dispatch({type: types.SOCKET_QUERY_USER_RECEIVED, payload: data})
  goToHomeScene()
}

function queryUnknownReception(data) {
  dispatch({type: types.SOCKET_QUERY_UNKNOWN_RECEIVED, payload: data})
}

export function goToLoginScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_LOGIN, payload: data})
  Actions.login()
}

export function goToHomeScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_HOME, payload: data})
  Actions.home()
}

export function goToFriendsScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_FRIENDS, payload: data})
  Actions.friends()
}

export function goToProfileScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_PROFILE, payload: data})
  Actions.profile()
}

export function goToVideoScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_VIDEO, payload: data})
  Actions.video()
}

export function goToErrorScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_ERROR, payload: data})
  Actions.error()
}