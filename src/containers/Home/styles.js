'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column'
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
    paddingTop   : 70,
    marginBottom : 75,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : getCorrectFontSizeForResolution(26),
    lineHeight   : getCorrectFontSizeForResolution(28),
    marginLeft   : 10,
    marginRight  : 10
  },

  centered: {
    alignSelf: 'center'
  },

  shadowed: {
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  },

  registerButton: {
    alignSelf: 'center',
    width: 180,
    height: 22,
    marginTop: 25,
    backgroundColor: '#888888',
    justifyContent: 'center'
  },

  registerButtonText: {
    color: 'white',
    fontFamily   : 'Helvetica',
    fontSize     : 11,
    alignSelf: 'center'
  },

  eventButton: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: 55,
    backgroundColor: '#006600',
    justifyContent: 'center',
    alignItems: 'center'
  },

  eventButtonDisabled: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },

  eventButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontFamily   : 'IndieFlower',
    fontSize     : getCorrectFontSizeForResolution(26),
    lineHeight   : getCorrectFontSizeForResolution(40)
  },

  video: {
    width    : 300,
    maxHeight: 170
  }

})
