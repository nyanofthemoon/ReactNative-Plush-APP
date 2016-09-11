'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : 28,
    lineHeight: 34
  },

  contactMessageContainer: {
    borderBottomColor: 'transparent',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 1
  },

  contactMessage: {
    color: 'black',
    fontFamily: 'Comfortaa'
  },

  selfMessageContainer: {
    borderBottomColor: 'transparent',
    borderRadius: 12,
    backgroundColor: '#CCC',
    marginBottom: 1
  },

  selfMessage: {
    color: 'black',
    fontFamily: 'Comfortaa',
    fontSize: 14
  }

})