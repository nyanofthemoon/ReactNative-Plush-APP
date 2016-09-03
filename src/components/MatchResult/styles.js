'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50
  },

  icon: {
    width : 105,
    height: 120
  },

  largeicon: {
    width : 200,
    height: 200
  }

})