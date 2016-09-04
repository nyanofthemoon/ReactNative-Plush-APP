'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  centered: {
    alignSelf: 'center'
  },

  title: {
    paddingTop   : 20,
    marginLeft   : 30,
    color        : 'white',
    fontFamily   : 'Condiment',
    fontSize     : 75,
    letterSpacing: 5,
    lineHeight   : 95,
    paddingRight : 20
  },

  subtitle: {
    paddingTop   : 40,
    marginBottom : 75,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 25,
    lineHeight   : 25
  },

  message: {
    marginTop    : 25,
    padding      : 10,
    color        : 'red',
    fontFamily   : 'Comfortaa',
    fontSize     : 12,
    lineHeight   : 12
  },

  shadowed: {
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  }

})
