'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : getCorrectFontSizeForResolution(28),
    lineHeight: getCorrectFontSizeForResolution(34)
  },

  listItem: {
    borderBottomColor: 'transparent',
    padding: 0,
    marginTop: 10
  },

  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  contactMessageContainer: {
    backgroundColor: '#DDD',
    borderRadius: 6,
    padding: getCorrectFontSizeForResolution(10),
    flex: 1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent: 'center'
  },

  contactMessage: {
    color: 'black',
    fontFamily: 'Comfortaa',
    fontSize: getCorrectFontSizeForResolution(14),
    flexWrap: 'wrap',
  },

  contactPictureContainer: {
    alignSelf: 'flex-start'
  },

  contactPicture: {
    height:getCorrectFontSizeForResolution(40),
    width:getCorrectFontSizeForResolution(40),
    borderRadius: getCorrectFontSizeForResolution(20),
    marginLeft: 8
  },

  selfMessageContainer: {
    borderRadius: 6,
    backgroundColor: '#262672',
    padding: getCorrectFontSizeForResolution(10),
    flex: 1,
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent: 'center'
  },

  selfMessage: {
    color: '#DDD',
    fontFamily: 'Comfortaa',
    fontSize: getCorrectFontSizeForResolution(14),
    letterSpacing: 0.5,
    flexWrap: 'wrap'
  },

  selfPictureContainer: {
    alignSelf: 'flex-start'
  },


  selfPicture: {
    height:40,
    width:40,
    borderRadius: 20,
    marginRight: 8
  }

})