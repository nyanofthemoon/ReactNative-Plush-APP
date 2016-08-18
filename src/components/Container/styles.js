'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  container: {
    backgroundColor: 'white'
  },

  statusBar: {
  },

  header: {
  },

  footer: {
  },

  cover: {
    resizeMode    : 'cover',
    width         : Dimensions.get('window').width,
    height        : Dimensions.get('window').height,
    alignItems    : 'center',
    justifyContent: 'center'
  }

})


