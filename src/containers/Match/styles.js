'use strict'

import { StyleSheet, Dimensions } from 'react-native'

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
  },

  slideImageContainer: {
    resizeMode: 'contain',
    width : null,
    height: null,
    flex: 1,
    marginBottom: 55,
    alignItems: 'center'
  },

  slideTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height - 125
  },

  slideText: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    marginBottom : 30,
    fontSize     : getCorrectFontSizeForResolution(22),
    lineHeight   : getCorrectFontSizeForResolution(32)
  },

  slideTextDetail: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    marginLeft   : 20,
    marginRight  : 20,
    marginBottom : 30,
    letterSpacing: 1,
    fontSize     : getCorrectFontSizeForResolution(18),
    lineHeight   : getCorrectFontSizeForResolution(28)
  },

  slideTextHeader: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    marginBottom : 50,
    fontSize     : getCorrectFontSizeForResolution(60),
    lineHeight   : getCorrectFontSizeForResolution(80)
  }

})