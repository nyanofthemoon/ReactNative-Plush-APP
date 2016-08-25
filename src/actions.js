'use strict'

import { Actions } from 'react-native-router-flux'
import { Geolocation } from 'react-native'
import Geocoder from 'react-native-geocoder'
const FBSDK = require('react-native-fbsdk')
const { AccessToken, GraphRequest, GraphRequestManager, FBSDKManager } = FBSDK

import * as types from './constants'
import Store      from './configureStore'
import * as Db    from './helpers/db'

import Config from './config'

import {createSocketConnection, destroySocketConnection, isSocketConnected, emitSocketUserLoginEvent, emitSocketUserQueryEvent, emitSocketUserLeaveEvent, emitSocketUpdateMatchEvent} from './helpers/socket'

let dispatch = Store.dispatch

Geocoder.fallbackToGoogle(Config.google.geocodingApiKey)

function _getState() {
  return Store.getState();
}

export function loadUserData() {
  if (_getState().user.getIn(['profile','gender']) === null) {
    Db.findUser(
      function (user) {
        if (user) {
          dispatch({type: types.DB_LOAD_USER, payload: { data: user } })
        }
      }
    )
  }
}

export function facebookConnectionSuccess() {
  dispatch({type: types.FACEBOOK_LOGIN_SUCCEEDED})
  socketConnectionRequest()
}

export function facebookConnectionFailure() {
  dispatch({type: types.FACEBOOK_LOGIN_FAILED})
  destroySocketConnection();
}

export function facebookConnectionLogout() {
  facebookConnectionFailure()
  Actions.home()
}

function socketConnectionRequest() {
  dispatch({type: types.SOCKET_CONNECTION_REQUESTED})
  let socket = createSocketConnection()
  socket.on('error', function(error) {
    dispatch({type: types.SOCKET_CONNECTION_FAILED})
    goToErrorScene('Connection error.')
  })
  socket.on('upgrade', function(data) {
    dispatch({type: types.SOCKET_CONNECTION_FAILED})
    goToErrorScene('New Version Available! Upgrade to continue.')
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
        Actions.home()
      })
      Db.findFacebookUser(
        function(user) {
          if (!user || Math.floor((Math.random()*100)) == 50) {
            dispatch({type: types.FACEBOOK_GRAPH_DATA_REQUESTED})
            facebookGraphGetProfile()
          } else {
           loginUser(user)
          }
        },
        function() {
          dispatch({type: types.FACEBOOK_GRAPH_DATA_REQUESTED})
          facebookGraphGetProfile()
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
  navigator.geolocation.getCurrentPosition(
    function(geo) {
      var current = {
        // http://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
        lat: parseFloat(geo.coords.latitude.toFixed(1)),
        lng: parseFloat(geo.coords.longitude.toFixed(1))
      }
      if (current.lng != _getState().user.getIn(['location','longitude']) || current.lat != _getState().user.getIn(['location','latitude'])) {
        Geocoder.geocodePosition(current).then(res => {
            data.country = res[0].country
            data.city = res[0].locality
            data.latitude = current.lat
            data.longitude = current.lng
            emitSocketUserLoginEvent(data)
            return {type: types.SOCKET_LOGIN_USER_REQUESTED, payload: data}
          })
          .catch(error => { goToErrorScene('Unable to analyze location. The application might be run on an older device either unable or having difficulties analyzing "location" data.') })
      } else {
        emitSocketUserLoginEvent(data)
        return {type: types.SOCKET_LOGIN_USER_REQUESTED, payload: data}
      }
    }, function(error) { alert(JSON.stringify(error)); goToErrorScene('Unable to retrieve location. Please ensure that the application on this device has permission to access "location" data.') } ,{
      enableHighAccuracy: true
    }
  )
}

export function queryUser() {
  emitSocketUserQueryEvent()
  return { type: types.SOCKET_QUERY_USER_REQUESTED, payload: {} }
}

function queryUserReception(data) {
  Db.saveUser(data.data, function () {
    if (_getState().app.get('apiStatus') !== 'connected') {
      setTimeout(function() {
        dispatch({type: types.SOCKET_QUERY_USER_RECEIVED, payload: data})
      }, 2500)
    } else {
      dispatch({type: types.SOCKET_QUERY_USER_RECEIVED, payload: data})
    }
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

export function goToLogoutScene(data) {
  dispatch({type: types.SCENE_NAVIGATION_LOGOUT, payload: data})
  emitSocketUserLeaveEvent()
  Actions.logout()
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

export function canShowAd() {
  let roomStatus = _getState().room.get('status')
  if (roomStatus && 'waiting' !== roomStatus) {
    return false
  }
  return true
}