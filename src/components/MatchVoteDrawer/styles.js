'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    height: Dimensions.get('window').height - 55,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.33)',
  },

  subcontainer: {
    justifyContent: 'center'
  },

  icon: {
    width : getCorrectFontSizeForResolution(50),
    height: getCorrectFontSizeForResolution(55)
  },

  button: {
    height: 70
  }

})