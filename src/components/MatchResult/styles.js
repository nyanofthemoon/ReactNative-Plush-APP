'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop    : 25
  },

  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -35
  },

  title: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : getCorrectFontSizeForResolution(28),
    lineHeight   : getCorrectFontSizeForResolution(35),
    marginBottom : 50
  },

  icon: {
    width : getCorrectFontSizeForResolution(105),
    height: getCorrectFontSizeForResolution(120),
    margin: 25
  },

  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 75,
    width: 200,
    paddingTop: 25
  },


})