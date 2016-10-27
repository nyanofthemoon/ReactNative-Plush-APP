'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  container: {
    width : Math.floor(Dimensions.get('window').width * 0.95),
    padding:0,
    backgroundColor: '#262672',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: 65
  },

  containerLegend: {
    width : Math.floor(Dimensions.get('window').width * 0.95),
    padding:0,
    backgroundColor: '#262672',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: 25
  },

  legendContainer: {
    minWidth: Math.floor((Dimensions.get('window').width * 0.95)*0.25),
    alignItems: 'center',
    maxHeight: 25,
    overflow: 'hidden',
  },

  textContainer: {
    backgroundColor: 'rgba(25, 25, 76, 0.99)',
    minWidth: Math.floor((Dimensions.get('window').width * 0.95)*0.15),
    alignItems: 'center',
    maxHeight: 50,
    overflow: 'hidden',
  },

  text: {
    fontSize: getCorrectFontSizeForResolution(45),
    lineHeight: 60,
    fontFamily: 'IndieFlower',
    color: 'white',
  },

  legendText: {
    fontSize: getCorrectFontSizeForResolution(15),
    lineHeight: getCorrectFontSizeForResolution(20),
    fontFamily: 'IndieFlower',
    color: 'white',
  },

  separator: {
    fontSize: 35,
    lineHeight: 35,
    color: 'white',
  },

  legendSeparator: {
    width: getCorrectFontSizeForResolution(45)
  }

})

