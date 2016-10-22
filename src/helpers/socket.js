'use strict'

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

export function emitSocketUserLoginEvent(provider, data) {
  if (true === isSocketConnected()) {
    data.provider = provider
    delete(data.null)
    socket.emit('login', {data: data})
  }
}

export function emitSocketUserQueryEvent() {
  if (true === isSocketConnected()) {
    socket.emit('query', {type: 'user'})
  }
}

export function emitSocketContactQueryEvent(id) {
  if (true === isSocketConnected()) {
    socket.emit('query', {type: 'user', id: id})
  }
}

export function emitSocketEventQueryEvent() {
  if (true === isSocketConnected()) {
    socket.emit('query', {type: 'event'})
  }
}

export function emitSocketUserJoinEvent(data, callback) {
  if (true === isSocketConnected()) {
    socket.emit('join', data, callback)
  }
}

export function emitSocketUserCallEvent(data, callback) {
  if (true === isSocketConnected()) {
    socket.emit('call', data, callback)
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

export function emitSocketUpdateProfileEvent(data) {
  if (true === isSocketConnected()) {
    socket.emit('update', {type: 'profile', data: data})
  }
}

export function emitSocketUpdateCallEvent(data, name) {
  if (true === isSocketConnected()) {
    socket.emit('update', {type: 'call', id: name, data: data})
  }
}

// @NOTE To prevent conversation message loss by storing them as offline messages
export function emitSocketUpdateAvailabilityEvent(status) {
  if (true === isSocketConnected()) {
    socket.emit('update', {type: 'availability', status: status})
  }
}

export function emitSocketBlockEvent(id) {
  if (true === isSocketConnected()) {
    socket.emit('update', {type: 'block', id: id})
  }
}

export function emitSocketReportEvent(id) {
  if (true === isSocketConnected()) {
    socket.emit('update', {type: 'report', id: id})
  }
}

export function emitSocketMessageEvent(id, message) {
  if (true === isSocketConnected()) {
    socket.emit('message', {id: id, message: message})
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

export function emitSocketUserDeletionRequestEvent() {
  if (true === isSocketConnected()) {
    socket.emit('delete', {})
  }
}