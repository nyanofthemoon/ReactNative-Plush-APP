'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  blockButton: {
    width: Math.round(Dimensions.get('window').width * 0.66) - 10,
    height: 45,
    marginTop: 5,
    marginLeft: 10
  },

  reportButton: {
    width: Math.round(Dimensions.get('window').width * 0.33) - 10,
    height: 45,
    marginTop: 5
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }

})