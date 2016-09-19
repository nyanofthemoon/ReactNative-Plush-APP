'use strict'

import { StyleSheet } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  centered: {
    alignSelf: 'center'
  },

  title: {
    marginLeft   : 30,
    color        : 'white',
    fontFamily   : 'MidnightConstellations',
    fontSize     : getCorrectFontSizeForResolution(90),
    lineHeight   : getCorrectFontSizeForResolution(95),
    paddingRight : 30
  },

  subtitle: {
    paddingTop   : 40,
    marginBottom : 75,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : getCorrectFontSizeForResolution(25),
    lineHeight   : getCorrectFontSizeForResolution(30)
  },

  message: {
    marginTop    : 25,
    padding      : 10,
    color        : 'red',
    fontFamily   : 'Comfortaa',
    fontSize     : getCorrectFontSizeForResolution(16),
    lineHeight   : getCorrectFontSizeForResolution(20)
  },

  shadowed: {
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  }

})
