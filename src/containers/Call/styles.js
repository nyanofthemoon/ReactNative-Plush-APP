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
    fontSize     : getCorrectFontSizeForResolution(32),
    lineHeight   : getCorrectFontSizeForResolution(40)
  },

  slideTextDetail: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    marginLeft   : 20,
    marginRight  : 20,
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
  },

  button: {
    alignSelf: 'center',
    paddingBottom: 50,
    paddingTop: 20,
    width: 200,
  },

  hidden: {
    height: 0,
    width: 0
  }

})