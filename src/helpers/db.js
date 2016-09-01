'use strict'

let storage = require('react-native-simple-store')

import Config from './../config'

export function findFacebookUser(success, failed) {
  storage.get('fb-user').then(success, failed)
}

export function saveFacebookUser(data, success, failed) {
  storage.save('fb-user', data).then(success, failed)
}

export function findUser(success, failed) {
  storage.get('user').then(success, failed)
}

export function saveUser(data, success, failed) {
  storage.save('user', data).then(success, failed)
}

export function deleteUser(success, failed) {
  storage.delete('user').then(success, failed)
}