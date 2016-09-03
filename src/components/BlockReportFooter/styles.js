'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  blockButton: {
    width: 175
  },

  reportButton: {
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