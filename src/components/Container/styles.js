'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  statusBar: {
    backgroundColor: '#262672'
  },

  header: {
    backgroundColor: '#262672'
  },

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : getCorrectFontSizeForResolution(28),
    lineHeight: getCorrectFontSizeForResolution(34),
    marginTop : 16,
    marginLeft: -28
  },

  tab: {
    backgroundColor: '#262672',
    color: 'white',
    fontFamily: 'Comfortaa',
    fontSize: getCorrectFontSizeForResolution(15),
    lineHeight: getCorrectFontSizeForResolution(18)
  },

  container: {
    backgroundColor: 'rgba(25, 25, 76, 0.7)'
  },

  content: {
    height: Dimensions.get('window').height - 75
  },

  footer: {
    backgroundColor: 'rgba(25, 25, 76, 0.9)',
    borderTopColor: 'transparent'
  },

  cover: {
    resizeMode     : 'cover',
    alignItems     : 'center',
    justifyContent : 'center'
  },

  selected: {
    color: 'orange'
  }

})