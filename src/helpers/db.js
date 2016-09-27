'use strict'

let storage = require('react-native-simple-store')

import Config from './../config'

export function findFacebookUser(success, failed) {
  storage.get('fb-user').then(success, failed)
}

export function saveFacebookUser(data, success, failed) {
  storage.save('fb-user', data).then(success, failed)
}

export function deleteFacebookUser(success, failed) {
  storage.delete('fb-user').then(success, failed)
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

export function findContacts(success, failed) {
  storage.get('contacts').then(success, failed)
}

export function saveContacts(data, success, failed) {
  storage.save('contacts', data).then(success, failed)
}

export function deleteContacts(success, failed) {
  storage.delete('contacts').then(success, failed)
}