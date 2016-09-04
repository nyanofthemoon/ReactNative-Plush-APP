'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  centered: {
    alignSelf: 'center'
  },

  bottomPadded: {
    marginBottom: 30
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
    paddingTop   : 70,
    marginBottom : 75,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 25,
    lineHeight   : 25
  },

  shadowed: {
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  },

  logout: {
    width: 182,
    height: 75
  }

})
