'use strict'

import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Platform } from 'react-native'

import reducer from './reducers'

const middlewares = [thunk]

let enhancer
if (__DEV__) {
  const installDevTools = require('immutable-devtools')
  installDevTools(Immutable)

  const reduxRemoteDevTools = require('remote-redux-devtools')
  enhancer = compose(
    applyMiddleware(...middlewares),
    global.reduxNativeDevTools ?
      global.reduxNativeDevTools() :
      reduxRemoteDevTools({
        name: Platform.OS,
        ...require('../package.json').remotedev,
      })
  )
} else {
  enhancer = applyMiddleware(...middlewares)
}

function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default)
    })
  }
  return store
}

export default configureStore()
