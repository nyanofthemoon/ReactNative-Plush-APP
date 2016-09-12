'use strict'

import { StyleSheet } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
  },

  title: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : getCorrectFontSizeForResolution(21),
    lineHeight   : getCorrectFontSizeForResolution(28),
    alignSelf    : 'center',
    marginTop    : 50,
    marginBottom : -50
  }

})