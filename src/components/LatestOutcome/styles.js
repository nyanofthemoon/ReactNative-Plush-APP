'use strict'

import { StyleSheet } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    width : 35,
    height: 40
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: getCorrectFontSizeForResolution(20),
    fontFamily: 'IndieFlower',
    marginRight: 50
  }

})