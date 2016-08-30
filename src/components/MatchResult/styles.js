'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 0.5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: Dimensions.get('window').height - 115,
    justifyContent: 'center'
  },

  icon: {
    width : 105,
    height: 120,
    margin: 10
  },

  largeicon: {
    width : 200,
    height: 200
  }

})