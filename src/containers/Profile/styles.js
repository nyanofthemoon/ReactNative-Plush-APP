'use strict'

import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({

  saveButton: {
    width: 175
  },

  logoutButton: {
    width: 75
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    marginTop: 9
  }

})


