'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  listItem: {
    marginRight: 5,
    marginLeft: 5,
  },

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : getCorrectFontSizeForResolution(28),
    lineHeight: getCorrectFontSizeForResolution(34)
  },

  button: {
    alignSelf: 'center',
    height: 80,
    width: 180,
    paddingTop: 18,
    marginTop: 50,
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 4,
    shadowOffset : {
      height: 5,
      width: 0
    }
  },

  nickname: {
    fontFamily: 'IndieFlower',
    fontSize: getCorrectFontSizeForResolution(20),
    lineHeight: getCorrectFontSizeForResolution(24),
    marginTop: 8,
    marginLeft: -8
  },

  gender: {
    marginTop: 4
  },

  badge: {
    alignSelf: 'flex-end',
    marginRight: -6,
    width: 28,
    height: 28
  },

  hidden: {
    height: 0,
    width: 0,
    padding: 0
  }

})