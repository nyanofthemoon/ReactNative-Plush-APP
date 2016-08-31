'use strict'

window.navigator.userAgent = 'react-native'
const io = require('socket.io-client/socket.io')

import Config from './../config'
import * as types from './../constants'

let socket

export function createSocketConnection() {
  if (false === isSocketConnected()) {
    socket = io(Config.environment.getServerUrl(), {
      transports: ['websocket'],
      jsonp     : false,
      query     : {
        token: Config.application.token
      }
    })
  }
  return socket
}

export function destroySocketConnection() {
  if (true === isSocketConnected()) {
    socket.disconnect();
  }
}

export function getSocketId() {
  if (true === isSocketConnected()) {
    return socket.id
  }
  return null
}

export function isSocketConnected() {
  if (socket && socket.connected) {
    return socket.connected
  }
  return false
}

export function emitSocketUserLoginEvent(data) {
  if (true === isSocketConnected()) {
    socket.emit('login', {data: data})
  }
}

export function emitSocketUserQueryEvent() {
  if (true === isSocketConnected()) {
    socket.emit('query', {type: 'user'})
  }
}

export function emitSocketUserJoinEvent() {
  if (true === isSocketConnected()) {
    socket.emit('join', {})
  }
}

export function emitSocketUserLeaveEvent() {
  if (true === isSocketConnected()) {
    socket.emit('leave', {})
  }
}

export function emitSocketUpdateMatchEvent(data) {
  if (true === isSocketConnected()) {
    socket.emit('update', {type: 'match', data: data})
  }
}

export function subscribeToMatchNotifications() {
  if (true === isSocketConnected()) {
    socket.emit('subscribe', {room: 'matches'})
  }
}

export function unsubscribeFromMatchNotifications() {
  if (true === isSocketConnected()) {
    socket.emit('unsubscribe', {room: 'matches'})
  }
}