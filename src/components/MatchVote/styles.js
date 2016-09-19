'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

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
    width : getCorrectFontSizeForResolution(90),
    height: getCorrectFontSizeForResolution(100)
  },

  button: {
    height: 110
  }

})