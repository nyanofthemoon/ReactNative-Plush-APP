'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  sendButton: {
    width: 75,
    marginTop: 5,
    marginLeft: 5,
    height: 45
  },

  value: {
    fontFamily: 'Comfortaa',
    fontSize: 14,
    width: Dimensions.get('window').width - 89,
    backgroundColor: '#262672',
    color: '#80bfff',
    borderBottomColor: 'transparent'
  }

})