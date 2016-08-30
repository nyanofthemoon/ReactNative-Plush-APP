'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').height - 115,
    justifyContent: 'center'
  },

  subcontainer: {
    justifyContent: 'center'
  },

  icon: {
    width : 90,
    height: 100
  },

  button: {
    height: 110
  }

})