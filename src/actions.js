const FBSDK = require('react-native-fbsdk');
const {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

import * as types from './constants'
import Store      from './configureStore'

import {createSocketConnection, emitSocketUserLoginEvent, emitSocketUserQueryEvent} from './helpers/socket';

let socket;
let dispatch = Store.dispatch;

export function facebookConnectionSuccess() {
  dispatch({type: types.FACEBOOK_LOGIN_SUCCEEDED});
  socketConnectionRequest();
}

export function facebookConnectionFailure() {
  dispatch({type: types.FACEBOOK_LOGIN_FAILED});
}

export function facebookLogout() {
  dispatch({type: types.FACEBOOK_LOGOUT});
}

function socketConnectionRequest() {
  dispatch({type: types.SOCKET_CONNECTION_REQUESTED});
  socket = createSocketConnection();
  socket.on('error', function(error) {
    dispatch({type: types.SOCKET_CONNECTION_FAILED});
  });

  socket.on('connect', function() {
    dispatch({type: types.SOCKET_CONNECTION_SUCCEEDED});
    socket.on('query', function(data) {
      switch(data.type) {
        case 'user': return queryUserReception(data);
        default    : return queryUnknownReception(data);
      }
    });
    dispatch({type: types.FACEBOOK_GRAPH_DATA_REQUESTED});
    facebookGraphGetProfile();
  });
}

export function facebookGraphGetProfile() {
  AccessToken.getCurrentAccessToken().then(function(data) {
    new GraphRequestManager().addRequest(new GraphRequest(
      '/me?fields=email,gender,first_name,last_name,link,picture,locale,timezone',
      null,
      function(error, result) {
        if (error) {
          dispatch({type: types.FACEBOOK_GRAPH_DATA_FAILED});
        } else {
          dispatch({type: types.FACEBOOK_GRAPH_DATA_SUCCEEDED, payload: result});
          loginUser(result);
        }
      }
    )).start();
  });
}

function loginUser(data) {
  emitSocketUserLoginEvent(data);
  return { type: types.SOCKET_LOGIN_USER_REQUESTED, payload: data }
}

export function queryUser() {
  emitSocketUserQueryEvent();
  return { type: types.SOCKET_QUERY_USER_REQUESTED, payload: {} }
}

function queryUserReception(data) {
  dispatch({type: types.SOCKET_QUERY_USER_RECEIVED, payload: data});
}

function queryUnknownReception(data) {
  dispatch({type: types.SOCKET_QUERY_UNKNOWN_RECEIVED, payload: data});
}