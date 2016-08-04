'use strict'

window.navigator.userAgent = 'react-native'
const io = require('socket.io-client/socket.io')

import Config from './../config'
import * as types from './../constants'

let socket

export function createSocketConnection() {
  socket = io(Config.environment.protocol + '://' + Config.environment.host + ':' + Config.environment.port, {
    transports: ['websocket'],
    jsonp     : false
  })
  return socket
}

export function emitSocketUserLoginEvent(data) {
  socket.emit('login', { data: data })
}

export function emitSocketUserQueryEvent() {
  socket.emit('query', { type: 'user' })
}