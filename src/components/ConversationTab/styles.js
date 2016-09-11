'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : 28,
    lineHeight: 34
  },

  listItem: {
    borderBottomColor: 'transparent',
    padding: 0,
    marginTop: 10
  },

  contactMessageContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10
  },

  contactMessage: {
    color: 'black',
    fontFamily: 'Comfortaa',
    fontSize: 14,
    letterSpacing: 0.25
  },

  selfMessageContainer: {
    borderRadius: 12,
    backgroundColor: '#CCC',
    padding: 10
  },

  selfMessage: {
    color: 'black',
    fontFamily: 'Comfortaa',
    fontSize: 14,
    letterSpacing: 0.25
  }

})