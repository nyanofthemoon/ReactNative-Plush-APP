'use strict'

import { StyleSheet } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
  },

  timer: {
    fontSize: getCorrectFontSizeForResolution(45),
    letterSpacing: 5,
    fontFamily: 'IndieFlower',
    color: 'white',
    marginTop: -5
  }

})

