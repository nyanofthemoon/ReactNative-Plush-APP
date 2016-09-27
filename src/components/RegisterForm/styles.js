'use strict'

import { StyleSheet } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    paddingBottom: 0
  },

  label: {
    backgroundColor: 'transparent',
    fontFamily: 'IndieFlower',
    fontSize: getCorrectFontSizeForResolution(20),
    color: 'white',
  },

  value: {
    fontFamily: 'IndieFlower',
    fontSize: getCorrectFontSizeForResolution(20),
    color: '#80bfff',
    backgroundColor: 'transparent',
  },

  warningContainer: {
    padding: 10,
    marginBottom: 10,
  },
  warning: {
    fontFamily: 'IndieFlower',
    fontSize: getCorrectFontSizeForResolution(16),
    color: 'yellow'
  },

  select: {
    paddingRight: 0,
    marginRight: 0,
    marginTop: getCorrectFontSizeForResolution(-8),
    backgroundColor: 'transparent',
  }

})

