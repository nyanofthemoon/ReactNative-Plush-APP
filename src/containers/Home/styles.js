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

  buttonText: {
    fontSize: getCorrectFontSizeForResolution(38),
    lineHeight: getCorrectFontSizeForResolution(34),
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

  cover: {
    resizeMode: 'cover',
    width : null,
    height: null,
    flex: 1,
    justifyContent: 'center'
  },

  coverText: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : getCorrectFontSizeForResolution(50),
    lineHeight   : getCorrectFontSizeForResolution(80)
  },

  registerButton: {
    alignSelf: 'center',
    width: 190,
    height: 22,
    marginTop: 25,
    backgroundColor: '#888888',
    justifyContent: 'center'
  },

  registerButtonText: {
    color: 'white',
    fontFamily   : 'Helvetica',
    fontSize     : 13,
    alignSelf: 'center'
  }

})
