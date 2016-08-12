'use strict'

window.navigator.userAgent = 'react-native'
const io = require('socket.io-client/socket.io')

import Config from './../config'
import * as types from './../constants'

let socket

export function createSocketConnection() {
  if (false === isSocketConnected()) {
    socket = io(Config.environment.protocol + '://' + Config.environment.host + Config.environment.port, {
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
  socket.emit('login', { data: data })
}

export function emitSocketUserQueryEvent() {
  socket.emit('query', { type: 'user' })
}

export function emitSocketUserJoinEvent() {
  socket.emit('join', {})
}

export function emitSocketUserLeaveEvent() {
  socket.emit('leave', {})
}

export function emitSocketUpdateMatchEvent(data) {
  socket.emit('update', { type: 'match', data: data })
}
