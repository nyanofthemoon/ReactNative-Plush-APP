'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  hangupButton: {
    width: Dimensions.get('window').width,
    height: 55
  },

  saveButton: {
    width: Math.round(Dimensions.get('window').width * 0.66) - 10,
    height: 45,
    marginTop: 5,
    marginLeft: 10
  },

  logoutButton: {
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