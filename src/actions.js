'use strict'

import {Actions} from 'react-native-router-flux'
const FBSDK = require('react-native-fbsdk')
const { AccessToken, GraphRequest, GraphRequestManager } = FBSDK

import * as types from './constants'
import Store      from './configureStore'
import * as Db    from './helpers/db'

import {createSocketConnection, destroySocketConnection, isSocketConnected, emitSocketUserLoginEvent, emitSocketUserQueryEvent, emitSocketUserLeaveEvent, emitSocketUpdateMatchEvent} from './helpers/socket'

let dispatch = Store.dispatch

function _getState() {
  return Store.getState();
}

export function facebookConnectionSuccess() {
  dispatch({type: types.FACEBOOK_LOGIN_SUCCEEDED})
  socketConnectionRequest()
}

export function facebookConnectionFailure() {
  dispatch({type: types.FACEBOOK_LOGIN_FAILED})
  destroySocketConnection();
  goToLoginScene()
}

function socketConnectionRequest() {
  dispatch({type: types.SOCKET_CONNECTION_REQUESTED})
  let socket = createSocketConnection()
  socket.on('error', function(error) {
    dispatch({type: types.SOCKET_CONNECTION_FAILED})
    goToErrorScene({ message: 'Server Maintenance. Please come back again later.' })
  })
  socket.on('upgrade', function(data) {
    goToErrorScene({ message: 'New Version Available! Please upgrade to continue.' })
  })
  let apiErrorMessage  = _getState().app.get('errorMessage')
  if (!apiErrorMessage) {
    socket.on('connect', function () {
      dispatch({type: types.SOCKET_CONNECTION_SUCCEEDED, payload: {socket: socket}})
      socket.on('query', function (data) {
        switch (data.type) {
          case 'user':
            return queryUserReception(data)
          case 'room':
            return queryRoomReception(data)
          default    :
            return queryUnknownReception(data)
        }
      })
      socket.on('disconnect', function () {
        dispatch({type: types.SOCKET_CONNECTION_FAILED})
        Actions.login()
      })
      Db.findFacebookUser(
        function(user) {
          if (!user) {
            dispatch({type: types.FACEBOOK_GRAPH_DATA_REQUESTED})
            facebookGraphGetProfile()
          } else {
            loginUser(user)
          }
        }
      )
    })
  }
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
          Db.saveFacebookUser(result, function() {
            dispatch({type: types.FACEBOOK_GRAPH_DATA_SUCCEEDED, payload: result})
            loginUser(result)
          })
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
  Db.saveUser(data, function() {
    if (_getState().user.get('email') === null) {
      goToHomeScene()
    }
    dispatch({type: types.SOCKET_QUERY_USER_RECEIVED, payload: data})
  })
}

function queryRoomReception(data) {
  dispatch({type: types.SOCKET_QUERY_ROOM_RECEIVED, payload: data})
}

function queryUnknownReception(data) {
  dispatch({type: types.SOCKET_QUERY_UNKNOWN_RECEIVED, payload: data})
}

export function updateMatch(data) {
  emitSocketUpdateMatchEvent(data)
  return { type: types.SOCKET_UPDATE_MATCH_REQUESTED }
}

export function goToLoginScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_LOGIN, payload: data})
  emitSocketUserLeaveEvent()
  Actions.login()
}

export function goToHomeScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_HOME, payload: data})
  emitSocketUserLeaveEvent()
  Actions.home()
}

export function goToFriendsScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_FRIENDS, payload: data})
  emitSocketUserLeaveEvent()
  Actions.friends()
}

export function goToProfileScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_PROFILE, payload: data})
  emitSocketUserLeaveEvent()
  Actions.profile()
}

export function goToVideoScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_VIDEO, payload: data})
  emitSocketUserLeaveEvent()
  Actions.video()
}

export function goToErrorScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_ERROR, payload: data})
  Actions.error()
}

export function handleAppStateChange(data) {
  dispatch({type: types.APPLICATION_STATE_CHANGED, payload: data})
  if ('active' !== data) {
    goToHomeScene()
  }
}

export function handleAppMemoryWarning() {
}